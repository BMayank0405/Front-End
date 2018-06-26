<template>
  <v-app>
    <navbar></navbar>
    <v-container>
      <form-container ref="formContainer" @requiredAction="register()" :fieldHeader="['U','P','D','A','T','E']" :errors="error" fieldButton="Update" btnIcon="person_add">
  
        <div slot="fieldInput">
          <v-form autocomplete>
            <v-container grid-list-lg class="elevation-10 logincontainer">
  
              <!-- layout for venues -->
              <v-layout row>
                <v-flex class="hidden-sm-and-down" md4>
                  <v-subheader class="fields">Select User</v-subheader>
                </v-flex>
                <v-flex xs12 md8>
                  <v-select :items="users" v-model="userid" item-text="username" item-value="_id" label="Select User" autocomplete prepend-icon="account_circle" v-on="{blur:getuser}"></v-select>
                </v-flex>
              </v-layout>
  
              <v-layout row wrap>
                <v-flex class="hidden-sm-and-down" md3>
                  <v-subheader class="fields">Name</v-subheader>
                </v-flex>
                <v-flex xs12 md8>
                  <v-text-field label="Name" :error-messages="nameErrors" prepend-icon="sentiment_satisfied" v-model.lazy="user[0].name" required @blur="delayTouch($v.user[0].name,100)" @input="delayTouch($v.user[0].name,500)">
                  </v-text-field>
                </v-flex>
              </v-layout>
  
              <v-layout row wrap>
                <v-flex class="hidden-sm-and-down" md3>
                  <v-subheader class="fields">Email</v-subheader>
                </v-flex>
                <v-flex xs12 md8 class="email__field">
                  <v-text-field name="email" label="EEmail" :error="EmailAvailable" :error-messages="emailErrors" v-model.lazy="user[0].email" prepend-icon="alternate_email" required @blur="delayTouch($v.user[0].email,200),validateEmail()" @input="delayTouch($v.user[0].email,2000)">
                  </v-text-field>
                </v-flex>
              </v-layout>
  
              <v-layout v-show="headrec">
                <v-flex class="hidden-sm-and-down" md3>
                  <v-subheader class="fields">Head</v-subheader>
                </v-flex>
  
                <v-flex xs12 md8>
                  <v-select :items="user[1]" v-model="user[0].headId" item-text="name" item-value="_id" label="Select Head" autocomplete prepend-icon="person"></v-select>
                </v-flex>
              </v-layout>
  
  
            </v-container>
          </v-form>
        </div>
      </form-container>
    </v-container>
  </v-app>
</template>


<script>
import { validationMixin } from "vuelidate";
import {
  required,
  minLength,
  maxLength,
  alphaNum,
  email,
  requiredIf
} from "vuelidate/lib/validators";

import { debounce } from "lodash";
import FormContainer from "./FieldComponents/FormContainer.vue";
import Navbar from "./Navbar.vue";
import AdminRequest from "@/services/AdminRequest";
import CommonRequest from "@/services/CommonRequest";

const GenericResponse = () => import("./Dialogs/GenericResponse");

const touchMap = new WeakMap();

import HeaderlessRequest from "@/services/HeaderlessRequest";
// import HeaderRequest from "@/services/HeaderRequest";

export default {
  components: {
    navbar: Navbar,
    "form-container": FormContainer,
    "generic-response": GenericResponse
  },
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.user[0].name.$dirty) return errors;
      !this.$v.user[0].name.required && errors.push("name is required.");
      !this.$v.user[0].name.minLength &&
        errors.push("name should be more than 5 characters long");
      !this.$v.user[0].name.maxLength &&
        errors.push("name must be at most 60 characters long");
      !this.user[0].name.match(/^[A-Za-z .'-]+$/) &&
        errors.push("Please specify your name in correct format");
      if (errors.length > 0) this.error[1] = true;
      else this.error[2] = false;
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.user[0].email.$dirty) return errors;
      !this.$v.user[0].email.email && errors.push("Must be valid e-mail");
      !this.$v.user[0].email.required && errors.push("E-mail is required");
      if (errors.length > 0) this.error[2] = true;
      else this.error[3] = false;
      return errors;
    }
  },
  mixins: [validationMixin],
  data() {
    return {
      error: [true, true],
      users: [],
      EmailAvailable: false,

      userid: "",
      headrec: null,
      user: [
        {
          id: null,
          email: null,
          name: null,
          headId: null
        },
        [
          {
            id: null,
            name: null
          }
        ]
      ]
    };
  },
  beforeCreate: async function() {
    try {
      const response = await CommonRequest.validateUser();
      if (response.data.flag != 5) {
        this.$router.push("/login");
      }
    } catch (error) {
      if (error) {
        this.$router.push("/login");
      }
    }
  },
  created: async function() {
    try {
      const response = await HeaderlessRequest.getAllUsers();
      this.users = response.data.user;
    } catch (err) {
      if (err) console.log(err);
    }
  },
  methods: {
    getuser: debounce(async function() {
      try {
        const response = await HeaderlessRequest.userbyId({
          id: this.userid
        });
        this.user = response.data.details;
        const society = [0, 1, 2];
        const faculty = [3, 4];
        if (society.includes(user[0].flag)) {
          // society
        } else {
          //faculty
        }
        if (this.user[0].flag)
          if (_.size(this.user) > 1) this.headrec = true;
          else this.headrec = emailfalse;
      } catch (err) {}
    }, 200)
  },

  validateEmail: debounce(async function() {
    if (this.error[3] == false) {
      try {
        const response = await AdminRequest.ValidateEmail({
          email: this.user[0].email
        });
      } catch (err) {
        if (err) {
          if (err.response != undefined) {
            if (err.response.data != "Unauthorized") {
              this.dialogIcon = "mood_bad";
              this.dialogHeader = "Email Taken";
              this.response = err.response.data.error;
              this.resp = true;
              this.EmailAvailable = true;
              this.error[3] = true;
            }
          }
        }
      }
    }
  }, 500),
  delayTouch: function($v, time = 0) {
    $v.$reset();
    if (touchMap.has($v)) clearTimeout(touchMap.get($v));
    touchMap.set($v, setTimeout($v.$touch, time));
  }
};
</script>


<style lang="scss" scoped>
.fields {
  font-size: 1.2rem;
  font-weight: bold;
  transform: translateY(7px);
}

.logincontainer {
  border-radius: 10px;
  margin-top: 15px;
  transform: translateX(60px);
  background-color: white;
}

@media screen and (min-width: 401px) and (max-width: 500px) {
  .logincontainer {
    transform: translateX(43px);
  }
}

@media screen and (max-width: 400px) {
  .logincontainer {
    transform: translateX(30px);
  }
}

.flex-center {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 20px;
}
</style>