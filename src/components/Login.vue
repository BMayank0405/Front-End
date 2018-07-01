<template>
  <v-app>
    <navbar :searchBar="false"></navbar>
    <v-container>
      <form-container @requiredAction="login()" :fieldHeader="['L','O','G','I','N']" fieldButton="LogIn" :errors="error" btnIcon="how_to_vote">
        <div slot="fieldInput">
          <v-form lazy-validation autocomplete>
            <v-container class="logincontainer elevation-10" grid-list-lg>
              <v-layout justify-center>
                <v-flex sm12 class="center">
                  <svgicon class="loginmale" name="malecartoonzipped" :original="true"></svgicon>
                </v-flex>
              </v-layout>
              <!-- for username -->
              <v-layout row>
                <v-flex class="hidden-sm-and-down" md3>
                  <v-subheader class="fields">Username</v-subheader>
                </v-flex>
                <v-flex xs12 md9>
                  <v-text-field name="username" label="Enter the Username" :error-messages="UsernameErrors" :prepend-icon="username_icon" v-model.lazy="Username" required @blur="resetUsernameIcon(),delayTouch($v.Username,200)" @input="delayTouch($v.Username,200)" @focus="changeUsernameIcon()">
                  </v-text-field>
                </v-flex>
              </v-layout>
  
              <!-- password field -->
              <v-layout row>
                <v-flex class="hidden-sm-and-down" md3>
                  <v-subheader class="fields">Password</v-subheader>
                </v-flex>
                <v-flex xs12 md9 class="pass__field">
                  <v-text-field name="password" label="Enter the password" hint="At least 8 characters" v-model.lazy="password" min="8" :prepend-icon="password_icon" :append-icon="visibility_icon ? 'visibility' : 'visibility_off'" @click:append="visibility_icon = !visibility_icon"
                    :type="visibility_icon ? 'text': 'password'" required :error-messages="passwordErrors" @blur="visible(),delayTouch($v.password,100)" @input="delayTouch($v.password,100)" @focus="hide()"></v-text-field>
                </v-flex>
              </v-layout>
  
              <v-btn color="blue darken-1" flat @click.native.stop="forgotPwd = true">Forgot Password ?</v-btn>
  
            </v-container>
          </v-form>
        </div>
      </form-container>
  
      <v-dialog v-model="forgotPwd" max-width="500">
        <forgot-password @clicked="forgotPassword"></forgot-password>
      </v-dialog>
  
      <v-dialog v-model="resp" max-width="500">
        <generic-response :message="response" :icon="dialogIcon" :header="dialogHeader" @clicked="resp = false"></generic-response>
      </v-dialog>
  
      <v-dialog v-model="spinner" max-width="51">
        <div style="min-height:53px;min-width:51px;overflow:hidden">
          <div class="spinner"></div>
        </div>
  
      </v-dialog>
  
  
    </v-container>
  </v-app>
</template>


<script>
import FormContainer from "./FieldComponents/FormContainer.vue";
import Navbar from "./Navbar.vue";
import HeaderlessRequest from "@/services/HeaderlessRequest";
import "../assets/compiled-icons/malecartoonzipped";
const ForgotPassword = () => import("./Dialogs/ForgotPassword");
const GenericResponse = () => import("./Dialogs/GenericResponse");

import { validationMixin } from "vuelidate";
import {
  required,
  minLength,
  maxLength,
  alphaNum
} from "vuelidate/lib/validators";

const touchMap = new WeakMap();
export default {
  components: {
    navbar: Navbar,
    "form-container": FormContainer,
    "forgot-password": ForgotPassword,
    "generic-response": GenericResponse
  },
  mixins: [validationMixin],
  computed: {
    // common properties
    UsernameErrors: function() {
      const errors = [];
      if (!this.$v.Username.$dirty) return errors;
      !this.$v.Username.required && errors.push("Username is required.");
      !this.$v.Username.minLength &&
        errors.push("Username should be more than 2 characters long");
      !this.$v.Username.maxLength &&
        errors.push("Username must be at most 30 characters long");
      !this.$v.Username.alphaNum &&
        errors.push("Username should only contain alphanumeric characters");
      if (errors.length > 0) this.error[0] = true;
      else this.error[0] = false;
      return errors;
    },
    passwordErrors: function() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Password is required.");
      !this.$v.password.minLength &&
        errors.push("Password should be more than 6 characters long");
      if (errors.length > 0) this.error[1] = true;
      else this.error[1] = false;
      return errors;
    }
  },
  validations: {
    //common validations
    Username: {
      required,
      alphaNum,
      minLength: minLength(3),
      maxLength: maxLength(30)
    },
    password: {
      required,
      minLength: minLength(3)
    }
  },
  data() {
    return {
      //FOR INPUT VALIDATION
      Username: "",
      username_icon: "account_box",
      password: "",
      password_icon: "lock",
      error: [true, true],
      visibility_icon: false,
      valid: true,
      forgotPwd: false,

      //for generic response
      resp: false,
      response: "",
      dialogHeader: "",
      dialogIcon: "",

      spinner: false
    };
  },
  beforeCreate: function() {
    this.$store.dispatch("logout");
  },
  methods: {
    forgotPassword: async function(value) {
      this.spinner = true;
      try {
        const response = await HeaderlessRequest.forgotPassword({
          username: value
        });
        this.spinner = false;
        this.forgotPwd = false;
        this.dialogHeader = "New Password sent !";
        this.dialogIcon = "check_circle_outline";
        this.response = "Your new Password has been mailed to you";
        this.resp = true;
      } catch (error) {
        if (error) {
          if (error.response == undefined) {
            this.dialogHeader = "Offline !";
            this.dialogIcon = "wifi_off";
            this.response = "Please try again after sometime";
          } else {
            this.dialogIcon = "sync_problem";
            this.dialogHeader = "Error !";
            this.response = error.response.data.error.replace(/"/g, "");
          }
        } else {
          this.dialogIcon = "sync_problem";
          this.dialogHeader = "Error !";
          this.response = "Internal server error";
        }
        this.spinner = false;
        this.forgotPwd = false;

        this.resp = true;
      }
    },
    login: async function() {
      const soc = [0, 1, 2];
      const fac = [3, 4];
      const admin = [5];
      if (this.error.includes(true)) {
        this.dialogHeader = "Error !";
        this.dialogIcon = "add_alert";
        this.response = "Username and Password are required";
        this.resp = true;
      } else {
        try {
          const response = await HeaderlessRequest.login({
            username: this.Username,
            password: this.password
          });
          this.$store.dispatch("login", response.data);
          if (soc.includes(response.data.flag))
            this.$router.push("/societyHome");
          else if (fac.includes(response.data.flag)) {
            this.$router.push("/facultyHome");
          } else if (admin.includes(response.data.flag))
            this.$router.push("/adminHome");
        } catch (error) {
          if (error.response == undefined) {
            this.dialogHeader = "Offline !";
            this.dialogIcon = "wifi_off";
            this.response = "Please try again after sometime";
          } else {
            this.dialogHeader = "Sorry !";
            this.dialogIcon = "notification_important";
            this.response = "Invalid Username and Password combination";
          }
          this.resp = true;
        }
      }
    },
    visible: function() {
      let specs = document.querySelectorAll('.loginmale path[pid="34"]')[0];
      specs.style.visibility = "visible";
    },
    hide: function() {
      let specs = document.querySelectorAll('.loginmale path[pid="34"]')[0];

      if (this.visibility_icon == true) {
        specs.style.visibility = "visible";
        this.password_icon = "lock_open";
      } else if (this.visibility_icon == false) {
        specs.style.visibility = "hidden";
        this.password_icon = "lock";
      }
    },
    changeUsernameIcon: function(value) {
      this.username_icon = "account_circle";
    },
    resetUsernameIcon: function() {
      this.username_icon = "account_box";
    },
    delayTouch: function($v, time) {
      $v.$reset();
      if (touchMap.has($v)) clearTimeout(touchMap.get($v));
      touchMap.set($v, setTimeout($v.$touch, time));
    }
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

.center {
  max-width: 25%;
  margin-bottom: 20px;
}

.spinner {
  border: 5px solid #f3f3f3;
  border-radius: 50%;
  border-top: 5px solid #3498db;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>