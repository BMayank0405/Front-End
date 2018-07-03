<template>
  <div>
    <navbar key="navbar"></navbar>
    <v-container key="inputs">
      <form-container @requiredAction="createEvent()" :fieldHeader="['C','R','E','A','T','E',' ','E','V','E' ,'N','T']" fieldButton="Create Event" :errors="error" btnIcon="fiber_new">
        <div slot="fieldInput">
  
          <v-form autocomplete="off">
            <v-container grid-list-lg class="elevation-10 logincontainer">
  
              <!-- layout for event name -->
              <v-layout row wrap>
                <v-flex class="hidden-sm-and-down" md4>
                  <v-subheader class="fields">Event Name</v-subheader>
                </v-flex>
                <v-flex xs12 md8>
                  <v-text-field label="Enter your event's name" clearable :error-messages="EventNameErrors" :success="!error[0]" v-model.lazy="EventName" prepend-icon="euro_symbol" required @blur="delayTouch($v.EventName,200)" @input="delayTouch($v.EventName,1000)">
                  </v-text-field>
                </v-flex>
              </v-layout>
  
              <v-layout row wrap>
                <v-flex class="hidden-sm-and-down" md4>
                  <v-subheader class="fields">Select Venue</v-subheader>
                </v-flex>
                <v-flex xs12 md8>
                  <v-autocomplete class="select__box" clearable :success="!error[1]" :items="venues" v-model="venue" item-text="name" item-value="_id" label="Select Venue" prepend-icon="edit_location" required :error-messages="venueErrors" @blur="delayTouch($v.venue,0)" @input="delayTouch($v.venue,500)"></v-autocomplete>
                </v-flex>
              </v-layout>
  
  
              <!-- layout for start date -->
              <v-layout row wrap>
                <v-flex class="hidden-sm-and-down" md4>
                  <v-subheader class="fields">Start Date</v-subheader>
                </v-flex>
                <v-flex xs12 md8>
                  <v-menu ref="startmenu" :close-on-content-click="false" v-model="startmenu" transition="scale-transition" offset-y full-width :nudge-right="40" min-width="290px" :return-value.sync="startDate">
                    <v-text-field slot="activator" :success="!error[2]" label="Select Start Date" v-model.lazy="startDate" prepend-icon="date_range" readonly required :error-messages="startDateErrors" @blur="delayTouch($v.startDate,0)" @input="delayTouch($v.startDate,200)"></v-text-field>
                    <v-date-picker v-model="startDate" :allowed-dates="validDates" scrollable>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="startmenu = false">Cancel</v-btn>
                      <v-btn flat color="primary" @click="$refs.startmenu.save(startDate)">OK</v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-flex>
              </v-layout>
  
              <!-- layout for end date -->
              <v-layout row wrap>
                <v-flex class="hidden-sm-and-down" md4>
                  <v-subheader class="fields">End Date</v-subheader>
                </v-flex>
                <v-flex xs12 md8>
                  <v-menu ref="endmenu" :close-on-content-click="false" v-model="endmenu" transition="scale-transition" offset-y full-width :nudge-right="40" min-width="290px" :return-value.sync="endDate">
                    <v-text-field slot="activator" :success="!error[3]" label="Select End Date" v-model.lazy="endDate" prepend-icon="date_range" readonly required :error-messages="endDateErrors" @blur="delayTouch($v.endDate,0)" @input="delayTouch($v.endDate,200)"></v-text-field>
                    <v-date-picker v-model="endDate" :allowed-dates="validDates" scrollable>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="endmenu = false">Cancel</v-btn>
                      <v-btn flat color="primary" @click="$refs.endmenu.save(endDate)">OK</v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-flex>
              </v-layout>
  
              <!-- layout for start time -->
              <v-layout row wrap>
                <v-flex class="hidden-sm-and-down" md4>
                  <v-subheader class="fields">Start Time</v-subheader>
                </v-flex>
                <v-flex xs12 md8>
                  <v-menu ref="startTimemenu" :close-on-content-click="false" v-model="stmenu" transition="scale-transition" offset-y full-width :nudge-right="40" max-width="290px" min-width="290px" :return-value.sync="startTime">
                    <v-text-field slot="activator" :success="!error[4]" label="Starting Time" v-model.lazy="startTime" prepend-icon="alarm" readonly required :error-messages="startTimeErrors" @blur="delayTouch($v.startTime,0)" @input="delayTouch($v.startTime,200)"></v-text-field>
  
                    <v-time-picker v-model="startTime" min="9:30" max="19:00" format="24hr" @change="$refs.startTimemenu.save(startTime)"></v-time-picker>
                  </v-menu>
                </v-flex>
              </v-layout>
  
              <!-- layout for end time -->
              <v-layout row wrap>
                <v-flex class="hidden-sm-and-down" md4>
                  <v-subheader class="fields">End Time</v-subheader>
                </v-flex>
                <v-flex xs12 md8>
                  <v-menu ref="endTimemenu" :close-on-content-click="false" v-model="etmenu" transition="scale-transition" offset-y full-width :nudge-right="40" Headermax-width="290px" min-width="290px" :return-value.sync="endTime">
                    <v-text-field slot="activator" :success="!error[5]" label="Ending Time" v-model.lazy="endTime" prepend-icon="alarm" readonly required :error-messages="endTimeErrors" @blur="getdata(),delayTouch($v.endTime,0)" @input="delayTouch($v.endTime,200)"></v-text-field>
  
                    <v-time-picker v-model="endTime" min="9:30" max="19:00" format="24hr" @change="$refs.endTimemenu.save(endTime)"></v-time-picker>
                  </v-menu>
                </v-flex>
              </v-layout>
  
              <v-layout row wrap>
                <v-flex class="hidden-sm-and-down" md4>
                  <v-subheader class="fields">Description</v-subheader>
                </v-flex>
                <v-flex xs12 md8>
                  <v-text-field label="Description" :success="!error[6]" clearable v-model.trim="description" counter="140" prepend-icon="description" :error-messages="descriptionErrors" required @blur="delayTouch($v.description,0)" @input="delayTouch($v.description,2000)">
                  </v-text-field>
                </v-flex>
              </v-layout>
  
              <!-- layoout for cordinator name-->
              <v-layout row wrap>
                <v-flex class="hidden-sm-and-down" md4>
                  <v-subheader class="fields">Co-ordinator's Name</v-subheader>
                </v-flex>
                <v-flex xs12 md8>
                  <v-text-field label="Enter Co-ordinator's Name" clearable :success="!error[7]"v-model.lazy="coordinatorName" prepend-icon="record_voice_over" required :error-messages="coordinatorNameErrors" @blur="delayTouch($v.coordinatorName,200)" @input="delayTouch($v.coordinatorName,200)">
                  </v-text-field>
                </v-flex>
              </v-layout>
  
              <!-- layoout for cordinator phone-->
              <v-layout row wrap>
                <v-flex class="hidden-sm-and-down" md4>
                  <v-subheader class="fields">Co-ordinator's Number</v-subheader>
                </v-flex>
                <v-flex xs12 md8>
                  <v-text-field name="coordinatorphone" clearable :success="!error[8]" label="Enter Co-ordinator's Number" single-line v-model="coordinatorPhone" type="tel" prepend-icon="phone_iphone" required :error-messages="coordinatorPhoneErrors" @blur="delayTouch($v.coordinatorPhone,200)" @input="delayTouch($v.coordinatorPhone,200)"></v-text-field>
                </v-flex>
              </v-layout>
  
              <!-- layout for form Url-->
              <v-layout row wrap>
                <v-flex class="hidden-sm-and-down" md4>
                  <v-subheader class="fields">Form Url</v-subheader>
                </v-flex>
                <v-flex xs12 md8>
                  <v-text-field name="formurl" :success="!error[9]" clearable label="Enter Form Url" v-model.lazy="formUrl" single-line prepend-icon="share" required :error-messages="formUrlErrors" @blur="delayTouch($v.formUrl,200)" @input="delayTouch($v.formUrl,200)"></v-text-field>
                </v-flex>
              </v-layout>
  
              <v-layout row wrap v-if="multi">
                <v-flex class="hidden-sm-and-down" md4>
                  <v-subheader class="fields">Is this</v-subheader>
                </v-flex>
                <v-layout row wrap md8>
                  <v-flex xs12>
                    <v-checkbox label="Cultural Event" :error-messages="CulturalErrors" prepend-icon="group" color="deep-purple lighten-1" v-model="Cultural" @blur="delayTouch($v.Cultural)" @input="delayTouch($v.Cultural)"></v-checkbox>
                  </v-flex>
                  <v-flex xs12>
                    <v-checkbox label="Technical Event" :error-messages="TechnicalErrors" prepend-icon="person" color="info" v-model="Technical" @blur="delayTouch($v.Technical)" @input="delayTouch($v.Technical)"></v-checkbox>
                  </v-flex>
                </v-layout>
              </v-layout>
  
  
            </v-container>
          </v-form>
        </div>
      </form-container>
    </v-container>
  
    <v-dialog v-model="resp" max-width="500">
      <generic-response :message="response" :header="dialogHeader" :icon="dialogIcon"  @clicked="resp = false"></generic-response>
    </v-dialog>
  
    <v-dialog v-model="eventreg" max-width="500">
      <event-success head="Success" icon="thumb" SuccessMessage="Event has been created successfully." @clicked="evenreg = false"></event-success>
    </v-dialog>
  
    <v-dialog v-model="eventclash"  max-width="500">
      <event-clash :clashEvents="sendEvents"></event-clash>
    </v-dialog>
  </div>
</template>


<script>
import CommonRequest from "@/services/CommonRequest";
import SocietyRequest from "../services/SocietyRequest";
const FormContainer = () => import("./FieldComponents/FormContainer");
const Navbar = () => import("./Navbar");
const EventClash = () => import("./Dialogs/EventClash");
const EventSuccess = () => import("./Dialogs/EventSuccess");
const GenericResponse = () => import("./Dialogs/GenericResponse");
import { validationMixin } from "vuelidate";
import {
  required,
  minLength,
  maxLength,
  requiredIf
} from "vuelidate/lib/validators";
import { deburr, debounce } from "lodash";
let reload = 1;
export default {
  components: {
    navbar: Navbar,
    "form-container": FormContainer,
    "event-clash": EventClash,
    "event-success": EventSuccess,
    "generic-response": GenericResponse
  },
  mixins: [validationMixin],
  data() {
    return {
      // v-model data
      EventName: "",
      venue: "",
      venues: [],

      startDate: "",
      endDate: "",
      startTime: null,
      endTime: null,
      description: "",
      coordinatorName: "",
      coordinatorPhone: "",
      formUrl: "",
      touchMap: new WeakMap(),

      //dialog boxes

      eventreg: false,
      resp: false,
      response: "",
      dialogIcon: "",
      dialogHeader: "",
      //FOR DATE PICKER
      startmenu: false,
      endmenu: false,
      modal: false,

      //FOR TIME PICKER
      startTimemenu: false,
      stmenu: false,
      modal2: false,

      // for check clashing events
      eventclash: false,
      sendEvents: [],

      endTimemenu: false,
      etmenu: false,

      //FOR INPUT VALIDATION
      response: "",
      error: [
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        false
      ],

      // check for society with id == 2
      multi: false,
      Cultural: false,
      Technical: false
    };
  },
  beforeCreate: async function() {
    try {
      let soc = [0, 1, 2];
      const response = await CommonRequest.validateUser();
      if (!soc.includes(response.data.flag)) {
        this.$router.push("/login");
      } else if (response.data.flag == 2) {
        this.multi = true;
        this.error[11] = true;
      }
    } catch (error) {
      if (error) {
        this.$router.push("/login");
      }
    }
  },
  created: async function() {
    try {
      let response = await CommonRequest.getVenues();
      this.venues = response.data.venues;
    } catch (error) {
      if (error) {
        this.dialogIcon = "";
        this.dialogHeader = "";
        this.response = "There is some problem while loading page.";
        this.resp = true;
      }
    }
  },
  computed: {
    EventNameErrors() {
      const errors = [];
      if (!this.$v.EventName.$dirty) return errors;
      !this.$v.EventName.required && errors.push("Event Name is required.");
      !this.$v.EventName.minLength &&
        errors.push("Event Name should be more than 5 characters long");
      !this.$v.EventName.maxLength &&
        errors.push("Event Name must be at most 60 characters long");
      if (errors.length > 0) this.error[0] = true;
      else this.error[0] = false;
      return errors;
    },
    venueErrors() {
      const errors = [];
      if (!this.$v.venue.$dirty) return errors;
      !this.$v.venue.required && errors.push("Venue is required");
      if (errors.length > 0) this.error[1] = true;
      else this.error[1] = false;
      return errors;
    },
    startDateErrors() {
      const errors = [];
      if (!this.$v.startDate.$dirty) return errors;
      !this.$v.startDate.required && errors.push("start date is required.");
      !(Date.parse(this.startDate) > Date.now()) &&
        errors.push("Start Date should be greater than current date");
      if (errors.length > 0) this.error[2] = true;
      else this.error[2] = false;
      return errors;
    },
    endDateErrors() {
      const errors = [];
      if (!this.$v.endDate.$dirty) return errors;
      !this.$v.endDate.required && errors.push("end date is required.");
      !(Date.parse(this.endDate) > Date.parse(this.startDate) - 1000) &&
        errors.push("end Date should be greater than start date");
      if (errors.length > 0) this.error[3] = true;
      else this.error[3] = false;
      return errors;
    },
    startTimeErrors() {
      const errors = [];
      if (!this.$v.startTime.$dirty) return errors;
      !this.$v.startTime.required && errors.push("start time is required.");
      !(Date.parse(`${this.startDate}T${this.startTime}Z`) > Date.now()) &&
        errors.push("Start Time should be greater than current time");
      if (errors.length > 0) this.error[4] = true;
      else this.error[4] = false;
      return errors;
    },
    endTimeErrors() {
      const errors = [];
      if (!this.$v.endTime.$dirty) return errors;
      if (this.$v.endTime.required) {
        let start = this.startTime.split(":");
        var end = this.endTime.split(":");
        if (start[0] > end[0])
          errors.push("End time should be greater than start time");
        else if (start[0] == end[0]) {
          if (start[1] >= end[1])
            errors.push("End time should be greater than start time");
        }
      } else errors.push("End time is required.");
      !(
        Date.parse(`${this.endDate}T${this.endTime}Z`) >
        Date.parse(`${this.startDate}T${this.startTime}Z`)
      ) && errors.push("End time should be greater than start time");

      if (errors.length > 0) this.error[5] = true;
      else this.error[5] = false;
      return errors;
    },
    descriptionErrors() {
      const errors = [];
      if (!this.$v.description.$dirty) return errors;
      !this.$v.description.required && errors.push("Description is required.");
      !this.$v.description.minLength &&
        errors.push("Description should be more than 120 characters long");
      !this.$v.description.maxLength &&
        errors.push("Description must be at most 140 characters long");
      if (errors.length > 0) this.error[6] = true;
      else this.error[6] = false;
      return errors;
    },
    coordinatorNameErrors() {
      const errors = [];
      if (!this.$v.coordinatorName.$dirty) return errors;
      !this.$v.coordinatorName.required &&
        errors.push("Coordinator Name is required.");
      !this.$v.coordinatorName.minLength &&
        errors.push("Coordinator Name should be more than 5 characters long");
      !this.$v.coordinatorName.maxLength &&
        errors.push("Coordinator Name must be at most 60 characters long");
      !this.coordinatorName.match(/^[A-Za-z .'-]+$/) &&
        errors.push("Please specify your Coordinator Name in correct format");
      if (errors.length > 0) this.error[7] = true;
      else this.error[7] = false;
      return errors;
    },
    coordinatorPhoneErrors() {
      const errors = [];
      if (!this.$v.coordinatorPhone.$dirty) return errors;
      !this.$v.coordinatorPhone.required &&
        errors.push("Phone number is required.");
      !this.coordinatorPhone.match(/^[1-9]{1}(\d){9}$/) &&
        errors.push("Please specify your phone number in correct format");
      if (errors.length > 0) this.error[8] = true;
      else this.error[8] = false;
      return errors;
    },
    formUrlErrors() {
      const errors = [];
      if (!this.$v.formUrl.$dirty) return errors;
      !this.$v.formUrl.required && errors.push("Form Url is required.");
      if (errors.length > 0) this.error[9] = true;
      else this.error[9] = false;
      return errors;
    },
    CulturalErrors() {
      const errors = [];
      if (!this.$v.Cultural.$dirty) return errors;
      !this.$v.Cultural.required && errors.push("Cultural is required.");
      if (errors.length > 0) this.error[11] = true;
      else this.error[11] = false;
      return errors;
    },
    TechnicalErrors() {
      const errors = [];
      if (!this.$v.Technical.$dirty) return errors;
      !this.$v.Technical.required && errors.push("Techical is required.");
      if (errors.length > 0) this.error[11] = true;
      else this.error[11] = false;
      return errors;
    }
  },
  validations: {
    EventName: {
      required,
      minLength: minLength(5),
      maxLength: maxLength(60)
    },
    venue: {
      required
    },
    startDate: {
      required
    },
    endDate: {
      required
    },
    startTime: {
      required
    },
    endTime: {
      required
    },
    description: {
      required,
      minLength: minLength(120),
      maxLength: maxLength(140)
    },
    coordinatorName: {
      required,
      minLength: minLength(5),
      maxLength: maxLength(60)
    },
    coordinatorPhone: {
      required
    },
    formUrl: {
      required
    },
    Cultural: {
      required: requiredIf(function() {
        return !this.Technical && this.multi;
      })
    },
    Technical: {
      required: requiredIf(function() {
        return !this.Cultural && this.multi;
      })
    }
  },
  watch: {
    Cultural: async function() {
      if (this.Cultural) this.Technical = false;
    },
    Technical: function() {
      if (this.Technical) this.Cultural = false;
    }
  },

  methods: {
    getdata: debounce(async function() {
      if (
        this.startDate &&
        this.endDate &&
        this.startTime &&
        this.endTime &&
        this.venue
      ) {
        if (
          !this.error[2] &&
          !this.error[3] &&
          !this.error[4] &&
          !this.error[5]
        ) {
          try {
            const response = await SocietyRequest.eventsAvailability({
              date: {
                startDate: this.startDate,
                endDate: this.endDate
              },
              time: {
                startTime: this.startTime,
                endTime: this.endTime
              },
              venueId: this.venue
            });

            if (response.data.length > 0) {
              let clashEvents = response.data;

              const actions = [
                {
                  message: "dateformat",
                  func: value =>
                    `${value.getDate()}/${value.getMonth() + 1}/${value
                      .getFullYear()
                      .toString()
                      .slice(2)}`
                },
                {
                  message: "timeformat",
                  func: value => {
                    let hrs = value.getUTCHours(),
                      suffix = "A.M",
                      min;
                    if (hrs >= 12) {
                      suffix = "P.M";
                      if (hrs > 12) hrs -= 12;
                      min = value.getUTCMinutes().toString();
                      if (min.length < 2) {
                        min = `0${min}`;
                      }
                    }
                    return `${hrs}:${min} ${suffix}`;
                  }
                }
              ];

              for (let event of clashEvents) {
                let start = new Date(event.startTime);

                let end = new Date(event.endTime);

                let Worker = this.$worker.create(actions);
                event.startdate = await Worker.postMessage("dateformat", [
                  start
                ]);
                event.enddate = await Worker.postMessage("dateformat", [end]);

                event.starttime = await Worker.postMessage("timeformat", [
                  start
                ]);
                event.endtime = await Worker.postMessage("timeformat", [end]);
                event.CurrentStatus = (function() {
                  switch (event.status) {
                    case 0:
                      return "Created";
                    case 1:
                      return "Approved by Managing Faculty";
                    case 2:
                      return "Approved by Approving Faculty";
                    case 3:
                      return "In Editing Phase";
                    case -3:
                      return "In Editing Phase";
                  }
                })();
              }
              this.error[10] = true;
              this.sendEvents = clashEvents;
              this.eventclash = true;
            } else {
              this.error[10] = false;
              this.eventclash = false;
            }
          } catch (error) {
            if (error.response == undefined) {
              this.dialogIcon = "wifi_off";
              this.dialogHeader = "Offline";
              this.response = "Please try again later";
              this.resp = true;
            }
          }
        }
      }
    }, 700),
    createEvent: async function() {
      console.log(this.description);
      let event = {
        name: deburr(this.EventName),
        description: deburr(this.description),
        venueId: this.venue,
        date: {
          startDate: this.startDate,
          endDate: this.endDate
        },
        time: {
          startTime: this.startTime,
          endTime: this.endTime
        },
        coordinator: {
          name: deburr(this.coordinatorName),
          phone: parseInt(this.coordinatorPhone, 10)
        },
        formUrl: this.formUrl
      };
      if (this.Cultural) {
        event.Type = 0;
      } else if (this.Technical) {
        event.Type = 1;
      }
      try {
        const response = await SocietyRequest.createEvent(event);
        this.eventreg = true;
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
              this.response = err.response.data.replace(/"/g, "");
            }
          }
        } else {
          this.dialogIcon = "warning";
          this.dialogHeader = "Error !";
          this.response = "Internal Server Error";
        }

        this.resp = true;
      }
    },
    delayTouch: function($v, time = 0) {
      $v.$reset();
      if (this.touchMap.has($v)) clearTimeout(this.touchMap.get($v));
      this.touchMap.set($v, setTimeout($v.$touch, time));
    },
    validDates: val => Date.parse(val) > Date.now()
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