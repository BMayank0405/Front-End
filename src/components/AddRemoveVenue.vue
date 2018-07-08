<template>
  <v-app>
    <navbar :searchBar="false"></navbar>
    <v-container>
      <form-container  @requiredAction="update()" :fieldHeader="['U','P','D','A','T','E']" :errors="error" fieldButton="Update" btnIcon="place">
        <div slot="fieldInput">
          <v-form autocomplete="off">
            <v-container grid-list-lg class="elevation-10 logincontainer">
              <v-layout row>
  
                <v-flex class="hidden-sm-and-down" md4>
                  <v-subheader class="fields">Action</v-subheader>
                </v-flex>
  
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-checkbox label="Add Venue" :error-messages="addErrors" prepend-icon="pin_drop" color="deep-purple accent-1" v-model="Add" @blur="delayTouch($v.Add)" @input="delayTouch($v.Add)"></v-checkbox>
                  </v-flex>
                  <v-flex xs12>
                    <v-checkbox label="Remove" :error-messages="removeErrors" prepend-icon="not_listed_location" color="deep-purple lighten-1" v-model="Remove" @blur="delayTouch($v.Remove)" @input="delayTouch($v.Remove)"></v-checkbox>
                  </v-flex>
                </v-layout>
              </v-layout>
  
              <transition name="soc__head" appear v-if="Add">
                <v-layout row>
                  <v-flex class="hidden-sm-and-down" md4>
                    <v-subheader class="fields">Add</v-subheader>
                  </v-flex>
                  <v-flex xs12 md8>
                    <v-text-field name="venue" clearable :success="!error[1]" label="Enter the venue name" :error-messages="AddVenueErrors" prepend-icon="add_location" v-model="AddVenue" required @blur="delayTouch($v.AddVenue)" @input="delayTouch($v.AddVenue,300)">
                    </v-text-field>
                  </v-flex>
                </v-layout>
              </transition>
              <transition name="soc__head" appear v-if="Remove">
                <v-layout row>
                  <v-flex class="hidden-sm-and-down" md4>
                    <v-subheader class="fields">Remove</v-subheader>
                  </v-flex>
                  <v-flex xs12 md8>
                    <v-autocomplete :items="venues" v-model="Venue" item-text="name" :success="!error[1]" :error-messages="RemoveVenueErrors" item-value="_id" label="Select Venue" required autocomplete @blur="delayTouch($v.Venue)" @input="delayTouch($v.Venue)" prepend-icon="not_listed_location"></v-autocomplete>
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
  beforeCreate: async function() {
    try {
      let fac = 5;
      const response = await CommonRequest.validateUser();
      if (response.data.flag != fac) this.$router.push("/login");
    } catch (error) {
      if (error) this.$router.push("/login");
    }
  },
  mixins: [validationMixin],
  data: function() {
    return {
      venues: [],
      venueid: "",
      Venue: "",
      Add: false,
      Remove: false,
      AddVenue: "",
      error: [true, true],
      response: "",
      resp: "",
      dialogHeader: "",
      dialogIcon: ""
    };
  },
  watch: {
    Remove: async function() {
      if (this.Remove) this.Add = false;
      if (this.venues.length == 0) {
        const response = await CommonRequest.getVenues();
        this.venues = response.data.venues;
      }
    },
    Add: async function() {
      if (this.Add) this.Remove = false;
    }
  },
  methods: {
    reload: function() {
      this.resp = false;
      location.reload();
    },
    update: async function() {
      if (this.Add) {
        try {
          await AdminRequest.addVenue({
            name: this.AddVenue
          });
          this.dialogIcon = "Congrats";
          this.dialogHeader = "thumbs_up";
          this.response = "User details have been updated";
          this.resp = true;
        } catch (err) {
          console.log(err);
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
      } else if (this.Remove) {
        await AdminRequest.removeVenue({
          id: this.Venue
        });
        this.dialogIcon = "Congrats";
        this.dialogHeader = "thumbs_up";
        this.response = "User details have been updated";
        this.resp = true;
        try {
        } catch (err) {
          console.log(err);
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
    delayTouch: function($v, time = 0) {
      $v.$reset();
      if (touchMap.has($v)) clearTimeout(touchMap.get($v));
      touchMap.set($v, setTimeout($v.$touch, time));
    }
  },
  computed: {
    addErrors() {
      const errors = [];
      if (!this.$v.Add.$dirty) return errors;
      !this.$v.Add.required && errors.push("This field is required");
      if (errors.length > 0) this.error[0] = true;
      else this.error[0] = false;
      return errors;
    },
    removeErrors() {
      const errors = [];
      if (!this.$v.Remove.$dirty) return errors;
      !this.$v.Remove.required && errors.push("This field is required");
      if (errors.length > 0) this.error[0] = true;
      else this.error[0] = false;
      return errors;
    },
    RemoveVenueErrors() {
      const errors = [];
      if (!this.$v.Venue.$dirty) return errors;
      !this.$v.Venue.required && errors.push("This field is required");
      if (errors.length > 0) this.error[1] = true;
      else this.error[1] = false;
      return errors;
    },
    AddVenueErrors() {
      const errors = [];
      if (!this.$v.AddVenue.$dirty) return errors;
      !this.$v.AddVenue.required && errors.push("This field is required");
      if (errors.length > 0) this.error[1] = true;
      else this.error[1] = false;
      return errors;
    }
  },
  validations: {
    Add: {
      required: requiredIf(function() {
        return !this.Remove;
      })
    },
    Remove: {
      required: requiredIf(function() {
        return !this.Add;
      })
    },
    Venue: {
      required: requiredIf(function() {
        return this.Remove;
      })
    },
    AddVenue: {
      required: requiredIf(function() {
        return this.Add;
      })
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