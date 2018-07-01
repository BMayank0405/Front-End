<template>
  <v-app>
    <navbar></navbar>
    <v-container>
      <form-container ref="formContainer" @requiredAction="register()" :fieldHeader="['U','P','D','A','T','E']" :errors="error" fieldButton="Register" btnIcon="person_add">
        <div slot="fieldInput">
          <v-form autocomplete="off">
            <v-container grid-list-lg class="elevation-10 logincontainer">
  
              <!-- for username -->
              <v-layout row>
                <v-flex class="hidden-sm-and-down" md4>
                  <v-subheader class="fields">Select User</v-subheader>
                </v-flex>
                <v-flex xs12 md8>
                  <v-select :items="users" v-model="userid" item-text="username" item-value="_id" label="Select User" autocomplete prepend-icon="account_circle" @blur="getUser()"></v-select>
                </v-flex>
              </v-layout>
  
  
              <transition-group name="soc__head" v-if="Object.keys(user).length != 0">
                <!-- for username -->
                <v-layout row key="Uname">
                  <v-flex class="hidden-sm-and-down" md4>
                    <v-subheader class="fields">Username</v-subheader>
                  </v-flex>
                  <v-flex xs12 md8>
                    <v-text-field name="username" clearable :error="UsernameAvailable" label="Enter the Username" :error-messages="UsernameErrors" prepend-icon="account_circle" v-model.lazy="Username" required @blur="delayTouch($v.Username,200),validateUser()" @input="delayTouch($v.Username,500)">
                    </v-text-field>
                  </v-flex>
                </v-layout>
  
                <!-- for name -->
                <v-layout row key="name">
                  <v-flex class="hidden-sm-and-down" md4>
                    <v-subheader class="fields">Name</v-subheader>
                  </v-flex>
                  <v-flex xs12 md8>
                    <v-text-field label="Enter the name" :success="true" clearable :error-messages="nameErrors" prepend-icon="sentiment_satisfied" v-model.lazy="name" required @blur="delayTouch($v.name,100)" @input="delayTouch($v.name,500)">
                    </v-text-field>
                  </v-flex>
                </v-layout>
  
                <!-- for email -->
                <v-layout row key="email">
                  <v-flex class="hidden-sm-and-down" md4>
                    <v-subheader class="fields">E-mail</v-subheader>
                  </v-flex>
                  <v-flex xs12 md8 class="email__field">
                    <v-text-field name="email" label="Enter the e-mail" clearable  :error="EmailAvailable" :error-messages="emailErrors" v-model.lazy="email" prepend-icon="alternate_email" required @blur="delayTouch($v.email,200),validateEmail()" @input="delayTouch($v.email,2000)">
                    </v-text-field>
                  </v-flex>
                </v-layout>
  
  
                <v-container v-if="user.flag == 0 || user.flag == 1 || user.flag == 2" key="society">
  
                  <v-layout>
  
                    <v-flex class="hidden-sm-and-down" md4>
                      <v-subheader class="fields">Category</v-subheader>
                    </v-flex>
  
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
                  </v-layout>
  
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
                      <v-subheader class="fields"><span>Approving Faculty</span><span v-if="user.flag == 2">(Cultural)</span></v-subheader>
                    </v-flex>
                    <v-flex xs12 md8>
                      <v-select :items="Approving_Faculty_Array" v-model="App_Faculty" item-text="username" item-value="_id" label="Select Approving Faculty for the society" autocomplete required :error-messages="approveselectErrors"
                        @blur="delayTouch($v.App_Faculty,100)" @input="delayTouch($v.App_Faculty,500)"></v-select>
                    </v-flex>
                  </v-layout>
  
                  <v-layout v-if="user.flag == 2">
                    <v-flex class="hidden-sm-and-down" md4>
                      <v-subheader class="fields ">Approving Faculty(Techinal)</v-subheader>
                    </v-flex>
                    <v-flex xs12 md8>
                      <v-select :items="Approving_Faculty_Array" v-model="Tech_App_Faculty" item-text="username" item-value="_id" label="Select Approving Faculty for the society" autocomplete required :error-messages="techapproveselectErrors" @blur="delayTouch($v.Tech_App_Faculty,100)"
                        @input="delayTouch($v.Tech_App_Faculty,500)"></v-select>
                    </v-flex>
                  </v-layout>
  
  
                </v-container>
  
                <v-container v-else-if="user.flag == 3 || user.flag == 4" key="faculty">
                  <v-layout>
                    <v-flex class="hidden-sm-and-down" md4>
                      <v-subheader class="fields">Change Type</v-subheader>
                    </v-flex>
                    <v-layout row wrap md8>
                      <v-flex xs12>
                        <v-checkbox label="Approving Faculty" :error-messages="approvingErrors" append-icon="supervisor_account" color="cyan lighten-2" v-model="ApprovingFaculty" @blur="delayTouch($v.ApprovingFaculty)" @input="delayTouch($v.ApprovingFaculty)"></v-checkbox>
                      </v-flex>
                      <v-flex xs12>
                        <v-checkbox label="Managing Faculty" :error-messages="managingErrors" append-icon="supervisor_account" color="teal lighten-2" v-model="ManagingFaculty" @blur="delayTouch($v.ManagingFaculty)" @input="delayTouch($v.ManagingFaculty)"></v-checkbox>
                      </v-flex>
                    </v-layout>
                  </v-layout>
  
                  <v-dialog v-model="replace" max-width="500">
                    <generic-response :message="response" :header="dialogHeader" :icon="dialogIcon" @clicked="resp = false"></generic-response>
                  </v-dialog>
                </v-container>
              </transition-group>
  
  
  
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
const FacultyReplace = () => import("./Dialogs/FacultyReplace");

const touchMap = new WeakMap();
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
  data() {
    return {
      //common data
      user: {},
      users: [],
      previousUserId: "",
      userid: "",
      Username: "",
      email: "",
      name: "",
      UsernameAvailable: false,
      EmailAvailable: false,
      flag: -1,

      Technical: false,
      Cultural: false,
      Techno_Managerial: false,

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
      dialogIcon: "",
      replace: false,

      headId: [],
      facultyId: []
    };
  },
  methods: {
    getUser: debounce(async function() {
      if (this.userid != this.previousUserId) {
        if (sessionStorage.getItem(this.userid) === null) {
          try {
            const response = await AdminRequest.userbyId({
              params: {
                id: this.userid
              }
            });
            this.previousUserId = this.userid;
            this.user = response.data.user;
            sessionStorage.setItem(this.userid, JSON.stringify(this.user));
          } catch (err) {
            if (err) console.log(err);
          }
        } else {
          this.user = JSON.parse(sessionStorage.getItem(this.userid));
        }
        const society = [0, 1, 2];
        const faculty = [3, 4];
        this.Username = this.user.username;
        this.email = this.user.email;
        this.name = this.user.name;
        if (society.includes(this.user.flag)) {
          // society
        } else {
          //faculty
        }
      }
    }, 1000),
    validateUser: debounce(async function() {
      if (this.error[0] == false) {
        try {
          const response = await AdminRequest.ValidateUsernameWithId({
            params: {
              username: this.Username
            }
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
    delayTouch: function($v, time = 0) {
      $v.$reset();
      if (touchMap.has($v)) clearTimeout(touchMap.get($v));
      touchMap.set($v, setTimeout($v.$touch, time));
    }
  },
  validations: {
    //common validations
    Username: {
      required,
      alphaNum,
      minLength: minLength(5),
      maxLength: maxLength(30)
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

    Cultural: {
      required: requiredIf(function() {
        return !this.Technical && !this.Techno_Managerial;
      })
    },
    Technical: {
      required: requiredIf(function() {
        return !this.Cultural && !this.Techno_Managerial;
      })
    },
    Techno_Managerial: {
      required: requiredIf(function() {
        return !this.Technical && !this.Cultural;
      })
    },

    ManagingFaculty: {
      required: requiredIf(function() {
        return !this.ApprovingFaculty;
      })
    },
    ApprovingFaculty: {
      required: requiredIf(function() {
        return !this.ManagingFaculty;
      })
    },

    Man_Faculty: {
      required: requiredIf(function() {
        return this.Cultural || !this.Technical || this.Techno_Managerial;
      })
    },
    App_Faculty: {
      required: requiredIf(function() {
        return this.Cultural || !this.Technical || this.Techno_Managerial;
      })
    },
    Tech_App_Faculty: {
      required: requiredIf(function() {
        return this.Techno_Managerial;
      })
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
      if (errors.length > 0) this.error[1] = true;
      else this.error[1] = false;
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      if (errors.length > 0) this.error[2] = true;
      else this.error[2] = false;
      return errors;
    },

    //society properties
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