<template>
  <v-app>
    <navbar></navbar>
    <v-container>
      <form-container ref="formContainer" @requiredAction="register()" :fieldHeader="['R','E','G','I','S','T','E','R']" :errors="error" fieldButton="Register" btnIcon="person_add">
        <div slot="fieldInput">
          <v-form autocomplete="off">
            <v-container grid-list-lg class="elevation-10 logincontainer">
  
              <!-- for username -->
              <v-layout row>
                <v-flex class="hidden-sm-and-down" md4>
                  <v-subheader class="fields">Username</v-subheader>
                </v-flex>
                <v-flex xs12 md8>
                  <v-text-field name="username" clearable :error="UsernameAvailable" label="Enter the Username" :error-messages="UsernameErrors" :prepend-icon="username_icon" v-model.lazy="Username" required @blur="resetUsernameIcon(),delayTouch($v.Username,200),validateUser()"
                    @input="delayTouch($v.Username,500)" @focus="changeUsernameIcon()">
                  </v-text-field>
                </v-flex>
              </v-layout>
  
              <!-- password field -->
              <v-layout row>
                <v-flex class="hidden-sm-and-down" md4>
                  <v-subheader class="fields">Password</v-subheader>
                </v-flex>
                <v-flex xs12 md8 class="pass__field">
                  <v-text-field name="password" clearable label="Enter the password" hint="At least 8 characters" v-model.lazy="password" min="8" prepend-icon="vpn_key" :append-icon="visibility_icon ? 'visibility' : 'visibility_off'" @click:append="visibility_icon = !visibility_icon"
                    :type="visibility_icon ? 'text': 'password'" required :error-messages="passwordErrors" @blur="delayTouch($v.password,100),removeKey()" @input="delayTouch($v.password,500)" @focus="moveKey()"></v-text-field>
                </v-flex>
              </v-layout>
  
              <!-- for name -->
              <v-layout row>
                <v-flex class="hidden-sm-and-down" md4>
                  <v-subheader class="fields">Name</v-subheader>
                </v-flex>
                <v-flex xs12 md8>
                  <v-text-field label="Enter the name" clearable :error-messages="nameErrors" :prepend-icon="name_icon" v-model.lazy="name" required @blur="resetNameIcon(),delayTouch($v.name,100)" @input="delayTouch($v.name,500)" @focus="changeNameIcon()">
                  </v-text-field>
                </v-flex>
              </v-layout>
  
              <!-- for email -->
              <v-layout row>
                <v-flex class="hidden-sm-and-down" md4>
                  <v-subheader class="fields">E-mail</v-subheader>
                </v-flex>
                <v-flex xs12 md8 class="email__field">
                  <v-text-field name="email" label="Enter the e-mail" clearable :error="EmailAvailable" :error-messages="emailErrors" v-model.lazy="email" :prepend-icon="mail_icon" required @blur="alternateMail(),delayTouch($v.email,200),validateEmail()" @input="delayTouch($v.email,2000)"
                    @focus="mailBox()">
                  </v-text-field>
                </v-flex>
              </v-layout>
  
              <!-- checkbox for selecting society or faculty -->
              <v-layout row wrap>
                <v-flex class="hidden-sm-and-down" md4>
                  <v-subheader class="fields">Is this</v-subheader>
                </v-flex>
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-checkbox label="Society" :error-messages="societyErrors" append-icon="group" color="purple lighten-2" v-model="Society" @blur="delayTouch($v.Society)" @input="delayTouch($v.Society)"></v-checkbox>
                  </v-flex>
                  <v-flex xs12>
                    <v-checkbox label="Faculty" :error-messages="facultyErrors" append-icon="person" color="green lighten-1" v-model="Faculty" @blur="delayTouch($v.Faculty)" @input="delayTouch($v.Faculty)"></v-checkbox>
                  </v-flex>
                </v-layout>
              </v-layout>
  
  
  
              <transition name="socFac" mode="out-in">
                <v-layout v-if="Society" key="society">
                  <transition name="soc__head" appear>
                    <v-flex class="hidden-sm-and-down" md4>
                      <v-subheader class="fields">Category</v-subheader>
                    </v-flex>
                  </transition>
                  <transition name="soc__category" appear>
                    <v-layout row wrap>
                      <v-flex xs12>
                        <v-checkbox label="Technical" :error-messages="technicalErrors" append-icon="group" color="deep-purple accent-1" v-model="Technical" @blur="delayTouch($v.Technical)" @input="delayTouch($v.Technical)"></v-checkbox>
                      </v-flex>
                      <v-flex xs12>
                        <v-checkbox label="Cultural" :error-messages="culturalErrors" append-icon="person" color="deep-purple lighten-1" v-model="Cultural" @blur="delayTouch($v.Cultural)" @input="delayTouch($v.Cultural)"></v-checkbox>
                      </v-flex>
                      <v-flex xs12>
                        <v-checkbox label="Techo-Managerial" :error-messages="technoErrors" append-icon="person" color="deep-purple darken-4" v-model="Techno_Managerial" @blur="delayTouch($v.Techno_Managerial)" @input="delayTouch($v.Techno_Managerial)"></v-checkbox>
                      </v-flex>
                    </v-layout>
                  </transition>
                </v-layout>
  
                <v-layout v-else-if="Faculty" key="faculty">
                  <transition name="soc__head" appear>
                    <v-flex class="hidden-sm-and-down" md4>
                      <v-subheader class="fields">Is this</v-subheader>
                    </v-flex>
                  </transition>
                  <transition name="soc__category" appear>
                    <v-layout row wrap>
                      <v-flex xs12>
                        <v-checkbox label="Approving Faculty" :error-messages="approvingErrors" append-icon="supervisor_account" color="cyan lighten-2" v-model="ApprovingFaculty" @blur="delayTouch($v.ApprovingFaculty)" @input="delayTouch($v.ApprovingFaculty)"></v-checkbox>
                      </v-flex>
                      <v-flex xs12>
                        <v-checkbox label="Managing Faculty" :error-messages="managingErrors" append-icon="supervisor_account" color="teal lighten-2" v-model="ManagingFaculty" @blur="delayTouch($v.ManagingFaculty)" @input="delayTouch($v.ManagingFaculty)"></v-checkbox>
                      </v-flex>
                    </v-layout>
                  </transition>
                </v-layout>
              </transition>
  
  
              <!-- approving and managing faculty selection for society -->
              <transition name="soc__head" mode="out-in">
                <v-container v-if="Cultural || Technical || Techno_Managerial" key="all">
                  <v-layout>
                    <v-flex class="hidden-sm-and-down" md4>
                      <v-subheader class="fields">Managing Faculty</v-subheader>
                    </v-flex>
                    <v-flex xs12 md8>
                      <v-select :items="Managing_Faculty_Array" v-model="Man_Faculty" item-text="username" item-value="_id" label="Select Managing Faculty for the society" autocomplete required :error-messages="manageselectErrors" @blur="delayTouch($v.Man_Faculty,100)" @input="delayTouch($v.Man_Faculty,500)"></v-select>
                    </v-flex>
                  </v-layout>
                  <v-layout>
                    <v-flex class="hidden-sm-and-down" md4>
                      <v-subheader class="fields"><span>Approving Faculty</span><span v-if="Techno_Managerial">(Cultural)</span></v-subheader>
                    </v-flex>
                    <v-flex xs12 md8>
                      <v-select :items="Approving_Faculty_Array" v-model="App_Faculty" item-text="username" item-value="_id" label="Select Approving Faculty for the society" autocomplete required :error-messages="approveselectErrors" @blur="delayTouch($v.App_Faculty,100)"
                        @input="delayTouch($v.App_Faculty,500)"></v-select>
                    </v-flex>
                  </v-layout>
  
                  <transition name="soc__head" mode="out-in">
                    <v-layout v-if="Techno_Managerial">
                      <v-flex class="hidden-sm-and-down" md4>
                        <v-subheader class="fields ">Approving Faculty(Techinal)</v-subheader>
                      </v-flex>
                      <v-flex xs12 md8>
                        <v-select :items="Approving_Faculty_Array" v-model="Tech_App_Faculty" item-text="username" item-value="_id" label="Select Approving Faculty for the society" autocomplete required :error-messages="techapproveselectErrors" @blur="delayTouch($v.Tech_App_Faculty,100)"
                          @input="delayTouch($v.Tech_App_Faculty,500)"></v-select>
                      </v-flex>
                    </v-layout>
                  </transition>
                </v-container>
              </transition>
  
  
            </v-container>
          </v-form>
        </div>
      </form-container>
  
      <v-dialog v-model="resp" max-width="500">
        <generic-response :message="response" :header="dialogHeader" :icon="dialogIcon" @clicked="resp = false"></generic-response>
      </v-dialog>
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
let movingKey, MailBox;
export default {
  components: {
    navbar: Navbar,
    "form-container": FormContainer,
    "generic-response": GenericResponse
  },
  mixins: [validationMixin],
  beforeCreate: async function() {
    try {
      let fac = 5;
      const response = await CommonRequest.validateUser();
      if (response.data.flag != fac) this.$router.push("/login");
    } catch (error) {
      if (error) this.$router.push("/login");
    }
  },
  computed: {
    // common properties
    UsernameErrors() {
      const errors = [];
      if (!this.$v.Username.$dirty) return errors;
      !this.$v.Username.required && errors.push("Username is required.");
      !this.$v.Username.minLength &&
        errors.push("Username should be more than 5 characters long");
      !this.$v.Username.maxLength &&
        errors.push("Username must be at most 30 characters long");
      !this.$v.Username.alphaNum &&
        errors.push("Username should only contain alphanumeric characters");
      if (errors.length > 0) this.error[0] = true;
      else this.error[0] = false;
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Password is required.");
      !this.$v.password.minLength &&
        errors.push("Password should be more than 6 characters long");
      if (errors.length > 0) this.error[1] = true;
      else this.error[1] = false;
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.required && errors.push("name is required.");
      !this.$v.name.minLength &&
        errors.push("name should be more than 5 characters long");
      !this.$v.name.maxLength &&
        errors.push("name must be at most 60 characters long");
      !this.name.match(/^[A-Za-z .'-]+$/) &&
        errors.push("Please specify your name in correct format");
      if (errors.length > 0) this.error[2] = true;
      else this.error[2] = false;
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      if (errors.length > 0) this.error[3] = true;
      else this.error[3] = false;
      return errors;
    },

    //society properties
    societyErrors() {
      const errors = [];
      if (!this.$v.Society.$dirty) return errors;
      !this.$v.Society.required && errors.push("This field is required");
      if (errors.length > 0) this.error[4] = true;
      else this.error[4] = false;
      return errors;
    },
    technicalErrors() {
      const errors = [];
      if (!this.$v.Technical.$dirty) return errors;
      !this.$v.Technical.required && errors.push("This field is required");
      if (errors.length > 0) this.error[5] = true;
      else this.error[5] = false;
      return errors;
    },
    culturalErrors() {
      const errors = [];
      if (!this.$v.Cultural.$dirty) return errors;
      !this.$v.Cultural.required && errors.push("This field is required");
      if (errors.length > 0) this.error[5] = true;
      else this.error[5] = false;
      return errors;
    },
    technoErrors() {
      const errors = [];
      if (!this.$v.Techno_Managerial.$dirty) return errors;
      !this.$v.Techno_Managerial.required &&
        errors.push("This field is required");
      if (errors.length > 0) this.error[5] = true;
      else this.error[5] = false;
      return errors;
    },

    //faculty properties
    facultyErrors() {
      const errors = [];
      if (!this.$v.Faculty.$dirty) return errors;
      !this.$v.Faculty.required && errors.push("This field is required");
      if (errors.length > 0) this.error[4] = true;
      else this.error[4] = false;
      return errors;
    },
    approvingErrors() {
      const errors = [];
      if (!this.$v.ApprovingFaculty.$dirty) return errors;
      !this.$v.ApprovingFaculty.required &&
        errors.push("This field is required");
      if (errors.length > 0) this.error[5] = true;
      else this.error[5] = false;
      return errors;
    },
    managingErrors() {
      const errors = [];
      if (!this.$v.ManagingFaculty.$dirty) return errors;
      !this.$v.ManagingFaculty.required &&
        errors.push("This field is required");
      if (errors.length > 0) this.error[5] = true;
      else this.error[5] = false;
      return errors;
    },
    manageselectErrors() {
      const errors = [];
      if (!this.$v.Man_Faculty.$dirty) return errors;
      !this.$v.Man_Faculty.required && errors.push("This field is required");
      if (errors.length > 0) this.error[6] = true;
      else this.error[6] = false;
      return errors;
    },
    approveselectErrors() {
      const errors = [];
      if (!this.$v.App_Faculty.$dirty) return errors;
      !this.$v.App_Faculty.required && errors.push("This field is required");
      if (errors.length > 0) this.error[7] = true;
      else this.error[7] = false;
      return errors;
    },
    techapproveselectErrors() {
      const errors = [];
      if (!this.$v.Tech_App_Faculty.$dirty) return errors;
      !this.$v.Tech_App_Faculty.required &&
        errors.push("This field is required");
      if (errors.length > 0) this.error[8] = true;
      else this.error[8] = false;
      return errors;
    }
  },
  data() {
    return {
      //common data
      Username: "",
      UsernameAvailable: false,
      username_icon: "account_box",
      password: "",
      visibility_icon: false,
      mail_icon: "alternate_email",
      email: "",
      EmailAvailable: false,
      name: "",
      name_icon: "sentiment_satisfied",
      flag: -1,

      //society date
      Society: false,
      Technical: false,
      Cultural: false,
      Techno_Managerial: false,

      //faculty data
      Faculty: false,
      ApprovingFaculty: false,
      ManagingFaculty: false,

      //error
      error: [true, true, true, true, true, true, true, true, true],

      //heads
      heads: [],
      Approving_Faculty_Array: [],
      App_Faculty: null,
      Tech_App_Faculty: null,
      Managing_Faculty_Array: [],
      Man_Faculty: null,

      response: "",
      resp: "",
      dialogHeader: "",
      dialogIcon: ""
    };
  },
  validations: {
    //common validations
    Username: {
      required,
      alphaNum,
      minLength: minLength(5),
      maxLength: maxLength(30)
    },
    password: {
      required,
      minLength: minLength(8)
    },
    name: {
      required,
      minLength: minLength(5),
      maxLength: maxLength(60)
    },
    email: {
      required,
      email
    },

    // society checking
    Society: {
      required: requiredIf(function() {
        return !this.Faculty;
      })
    },

    Cultural: {
      required: requiredIf(function() {
        return !this.Technical && !this.Techno_Managerial && this.Society;
      })
    },
    Technical: {
      required: requiredIf(function() {
        return !this.Cultural && !this.Techno_Managerial && this.Society;
      })
    },
    Techno_Managerial: {
      required: requiredIf(function() {
        return !this.Technical && !this.Cultural && this.Society;
      })
    },

    // faculty checking
    Faculty: {
      required: requiredIf(function() {
        return !this.Society;
      })
    },
    ManagingFaculty: {
      required: requiredIf(function() {
        return this.Faculty && !this.ApprovingFaculty;
      })
    },
    ApprovingFaculty: {
      required: requiredIf(function() {
        return this.Faculty && !this.ManagingFaculty;
      })
    },
    Man_Faculty: {
      required: requiredIf(function() {
        return this.Society;
      })
    },
    App_Faculty: {
      required: requiredIf(function() {
        return this.Society;
      })
    },
    Tech_App_Faculty: {
      required: requiredIf(function() {
        return this.Techno_Managerial;
      })
    }
  },
  watch: {
    Society: async function() {
      if (this.Society == true) {
        this.Faculty = false;
        if (!(this.heads.length > 0)) {
          try {
            const response = await AdminRequest.getHead();
            this.heads = response.data.head;
            for (let head of this.heads) {
              if (head.flag == 4) this.Approving_Faculty_Array.push(head);
              else if (head.flag == 3) this.Managing_Faculty_Array.push(head);
            }
          } catch (err) {
            if (err) {
              if (err.response == undefined) {
                this.dialogIcon = "wifi_off";
                this.dialogHeader = "Offline";
                this.response = "Please try again later";
              } else {
                this.dialogIcon = "add_alert";
                this.dialogHeader = "Error !";
                if (err.response.data.includes("Unauthorized")) {
                  this.response = "Your session has expired";
                } else {
                  this.response = err.response.data;
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
      } else {
        this.Cultural = false;
        this.Technical = false;
        this.Techno_Managerial = false;
        this.error[8] = false;
      }
    },
    Faculty: async function() {
      if (this.Faculty == true) {
        this.Society = false;
        this.error[6] = this.error[7] = this.error[8] = false;
      } else {
        this.error[6] = this.error[7] = this.error[8] = true;
        this.ManagingFaculty = false;
        this.ApprovingFaculty = false;
      }
    },
    Cultural: async function() {
      if (this.Cultural == true) {
        if (this.Society == false) {
          this.Cultural == false;
        } else {
          this.Technical = false;
          this.Techno_Managerial = false;
          this.flag = 0;
          this.error[8] = false;
        }
      }
    },
    Technical: async function() {
      if (this.Technical == true) {
        if (this.Society == false) {
          this.Technical == false;
        } else {
          this.Cultural = false;
          this.Techno_Managerial = false;
          this.flag = 1;
          this.error[8] = false;
        }
      }
    },
    Techno_Managerial: async function() {
      if (this.Techno_Managerial == true) {
        if (this.Society == false) {
          this.Techno_Managerial == false;
        } else {
          this.Cultural = false;
          this.Technical = false;
          this.flag = 2;
        }
      }
    },
    ApprovingFaculty: async function() {
      if (this.ApprovingFaculty == true) {
        if (this.Faculty == false) {
          this.ApprovingFaculty == false;
        } else {
          this.ManagingFaculty = false;
          this.flag = 4;
        }
      }
    },
    ManagingFaculty: async function() {
      if (this.ManagingFaculty == true) {
        if (this.Faculty == false) {
          this.ManagingFaculty == false;
        } else {
          this.ApprovingFaculty = false;
          this.flag = 3;
        }
      }
    }
  },
  methods: {
    register: async function() {
      if (this.error.includes(true)) {
        this.dialogIcon = "add_alert";
        this.dialogHeader = "Error !";
        this.response = "Fill the details correctl";
        this.resp = true;
      } else {
        let newUser = {
          username: this.Username.trim(),
          password: this.password,
          name: this.name.trim(),
          email: this.email.trim(),
          flag: this.flag
        };
        if (this.flag == 0 || this.flag == 1 || this.flag == 2) {
          newUser.facultyId = this.Man_Faculty;
          newUser.headId = {};
          if (this.flag == 2) {
            newUser.headId.cultural = this.App_Faculty;
            newUser.headId.technical = this.Tech_App_Faculty;
          } else if (this.flag == 0) {
            newUser.headId.cultural = this.App_Faculty;
          } else if (this.flag == 1) {
            newUser.headId.technical = this.App_Faculty;
          }
        }
        try {
          const response = await AdminRequest.register(newUser);
        } catch (err) {
          if (err) {
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
    moveKey: function() {
      let el = document.querySelector(".pass__field > div > div > i");
      let key = [
        {
          transform: "rotateX(-70deg) translateX(0px)"
        },
        {
          transform: "rotateX(70deg) translateX(3px)"
        }
      ];
      movingKey = el.animate(key, {
        duration: 600,
        direction: "alternate",
        iterations: Infinity
      });
    },
    removeKey: function() {
      movingKey.cancel();
    },
    mailBox: function() {
      this.mail_icon = "drafts";
    },
    alternateMail: function() {
      this.mail_icon = "alternate_email";
    },
    changeUsernameIcon: function() {
      this.username_icon = "account_circle";
    },
    resetUsernameIcon: function() {
      this.username_icon = "account_box";
    },
    validateUser: debounce(async function() {
      if (this.error[0] == false) {
        try {
          const response = await AdminRequest.ValidateUsername({
            params: { username: this.Username }
          });
        } catch (err) {
          if (err) {
            if (err.response != undefined) {
              if (err.response.data != "Unauthorized") {
                this.dialogIcon = "mood_bad";
                this.dialogHeader = "Username Taken";
                this.response = err.response.data.error;
                this.resp = true;
                this.UsernameAvailable = true;
                this.error[0] = true;
              }
            }
          }
        }
      }
    }, 500),
    validateEmail: debounce(async function() {
      if (this.error[3] == false) {
        try {
          const response = await AdminRequest.ValidateEmail({
            params: { email: this.email }
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
    changeNameIcon: function() {
      this.name_icon = "sentiment_very_satisfied";
    },
    resetNameIcon: function() {
      this.name_icon = "sentiment_satisfied";
    },
    delayTouch: function($v, time = 0) {
      $v.$reset();
      if (touchMap.has($v)) clearTimeout(touchMap.get($v));
      touchMap.set($v, setTimeout($v.$touch, time));
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

.socFac-enter-active {
  transition: all 0.5s;
}

.socFac-leave-active {
  transition: all 1s;
}

.socFac-enter,
.socFac-leave-to {
  opacity: 0;
}

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