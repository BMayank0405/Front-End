<template>
  <v-app>
    <navbar :searchBar="false"></navbar>
    <v-container>
      <form-container ref="formContainer" @requiredAction="remove()" :fieldHeader="['R','E','M','O','V','E']" :errors="error" fieldButton="Remove" btnIcon="person_add">
        <div slot="fieldInput">
          <v-form autocomplete="off">
            <v-container grid-list-lg class="elevation-10 logincontainer">
              <v-layout row>
                <v-flex class="hidden-sm-and-down" md4>
                  <v-subheader class="fields">Select User</v-subheader>
                </v-flex>
                <v-flex xs12 md8>
                  <v-autocomplete :items="users" v-model="user" item-text="username" :return-object="true" :error-messages="userErrors" label="Select User" required autocomplete prepend-icon="account_circle" @blur="delayTouch($v.user)"
                      @input="delayTouch($v.user)"></v-autocomplete>
                </v-flex>
              </v-layout>
              <transition name="soc__head" v-if="user.flag == 3" appear>
                <v-layout>
                  <v-flex class="hidden-sm-and-down" md4>
                    <v-subheader class="fields">Replace with</v-subheader>
                  </v-flex>
                  <v-flex xs12 md8>
                    <v-autocomplete prepend-icon="record_voice_over" :items="Managing_Faculty_Array" v-model="Replace" item-text="username" item-value="_id" label="Select Managing Faculty" autocomplete required :error-messages="replaceErrors" @blur="delayTouch($v.Replace)"
                      @input="delayTouch($v.Replace)"></v-autocomplete>
                  </v-flex>
                </v-layout>
              </transition>
              <transition name="soc__head" v-else-if="user.flag == 4" appear>
                <v-layout>
                  <v-flex class="hidden-sm-and-down" md4>
                    <v-subheader class="fields">Replace with</v-subheader>
                  </v-flex>
                  <v-flex xs12 md8>
                    <v-autocomplete prepend-icon="record_voice_over" :items="Approving_Faculty_Array" v-model="Replace" item-text="username" item-value="_id" label="Select Approving Faculty" autocomplete required :error-messages="replaceErrors" @blur="delayTouch($v.Replace)"
                      @input="delayTouch($v.Replace)"></v-autocomplete>
                  </v-flex>
                </v-layout>
              </transition>
            </v-container>
          </v-form>
        </div>
      </form-container>
            <v-dialog v-model="resp" max-width="500" @input="reload()">
        <generic-response :message="response" :header="dialogHeader" :icon="dialogIcon" @clicked="reload()"></generic-response>
      </v-dialog>
    </v-container>
  </v-app>
</template>


<script>
import { validationMixin } from "vuelidate";
import { required, requiredIf } from "vuelidate/lib/validators";

import CommonRequest from "@/services/CommonRequest";
import AdminRequest from "@/services/AdminRequest";

const Navbar = () => import("./Navbar");
const FormContainer = () => import("./FieldComponents/FormContainer.vue");
const GenericResponse = () => import("./Dialogs/GenericResponse");

const touchMap = new WeakMap();
export default {
  components: {
    navbar: Navbar,
    "form-container": FormContainer,
    "generic-response": GenericResponse
  },
  data: function() {
    return {
      users: [],
      user: [],
      Managing_Faculty_Array: [],
      Approving_Faculty_Array: [],
      Replace: "",
      Replace: "",
      error: [true, false],
            response: "",
      resp: "",
      dialogHeader: "",
      dialogIcon: "",
    };
  },
  watch: {
    user: async function() {
      if (this.user.flag == 3 || this.user.flag == 4) this.error[1] = true;
      else this.error[1] = false;
    }
  },
  beforeCreate: async function() {
    try {
      let fac = 5;
      const response = await CommonRequest.validateUser();
      if (response.data.flag != fac) this.$router.push("/login");
    } catch (error) {
      if (error) this.$router.push("/login");
    }
  },
  created: async function() {
    try {
      const response = await AdminRequest.getAllUsers();
      this.users = response.data.user;
      for (let user of this.users) {
        if (user.flag == 3) this.Managing_Faculty_Array.push(user);
        else if (user.flag == 4) this.Approving_Faculty_Array.push(user);
      }
    } catch (err) {
      if (err) console.log(err);
    }
  },
  mixins: [validationMixin],
  methods: {
        reload: function() {
      this.resp = false;
      location.reload();
    },
    remove: async function() {
      let fac = [3,4];
      let result = true;
      if(fac.includes(this.user.flag)){
        result = false;
      try {
        await AdminRequest.replaceFaculty({
          id: this.user._id,
          flag: this.user.flag,
          replace : this.Replace
        });
        result = true
      } catch (err) {
            result = false;
            console.log(err);
            if (err) {
              console.log(err);
              if (err.response == undefined) {
                this.dialogIcon = "wifi_off";
                this.dialogHeader = "Offline";
                this.response = "Please try again later";
              } else {
                this.dialogIcon = "add_alert";
                this.dialogHeader = "Error !";
                if (err.response.data.error.includes("Unauthorized")) {
                  this.response = "Your session has expired";
                } else {
                  this.response = err.response.data.error.replace(/"/g, "");
                }
              }
            } else {
              this.dialogIcon = "warning";
              this.dialogHeader = "Error !";
              this.response = "Internal Server Error";
            }
            this.resp = true;
      }
      }
      if(result){
        try{
          await AdminRequest.removeUser({
            id:this.user._id,
            flag:this.user.flag
          });
            this.dialogIcon = "Congrats";
            this.dialogHeader = "thumbs_up";
            this.response = "User has been deleted";
            this.resp = true;
        }
        catch(err){
            console.log(err);
            if (err) {
              console.log(err);
              if (err.response == undefined) {
                this.dialogIcon = "wifi_off";
                this.dialogHeader = "Offline";
                this.response = "Please try again later";
              } else {
                this.dialogIcon = "add_alert";
                this.dialogHeader = "Error !";
                if (err.response.data.error.includes("Unauthorized")) {
                  this.response = "Your session has expired";
                } else {
                  this.response = err.response.data.error.replace(/"/g, "");
                }
              }
            } else {
              this.dialogIcon = "warning";
              this.dialogHeader = "Error !";
              this.response = "Internal Server Error";
            }
            this.resp = true;
        }

      }

    },

    delayTouch: function($v, time = 0) {
      $v.$reset();
      if (touchMap.has($v)) clearTimeout(touchMap.get($v));
      touchMap.set($v, setTimeout($v.$touch, time));
    }
  },
  validations: {
    user: {
      required
    },
    Replace: {
      required: requiredIf(function() {
        return this.user.flag == 3 || this.user.flag == 4;
      })
    }
  },
  computed: {
    userErrors() {
      const errors = [];
      if (!this.$v.user.$dirty) return errors;
      !this.$v.user.required && errors.push("This field is required");
      if (errors.length > 0) this.error[0] = true;
      else this.error[0] = false;
      return errors;
    },
    replaceErrors() {
      const errors = [];
      if (!this.$v.Replace.$dirty) return errors;
      !this.$v.Replace.required && errors.push("This field is required");
      if (errors.length > 0) this.error[1] = true;
      else this.error[1] = false;
      return errors;
    }
  }
};
</script>




<style lang="scss" scoped>
.layout > .flex > .flex {
  padding: 0px !important;
}

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

/*transition for selecting society or faculty*/

.soc__head-enter-active,
.soc__head-leave-active,
.soc__category-enter-active,
.soc__category-leave-active {
  transition: all 0.8s 0.3s;
}

.soc__head-enter,
.soc__head-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}

.soc__category-enter,
.soc__category-leave-to {
  transform: translateX(100px);
  opacity: 0;
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
</style>