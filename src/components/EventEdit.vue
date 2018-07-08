<template>
  <v-app>
    <navbar :searchBar="false"></navbar>
    <v-container>
      <form-container ref="formContainer" @requiredAction="updateEvent()" :fieldHeader="['U','P','D','A','T','E',' ','E','V','E' ,'N','T']" :errors="error" fieldButton="Update Event" btnIcon="rate_review">
        <div slot="fieldInput">
  
          <v-form autocomplete>
            <v-container grid-list-lg class="elevation-10 logincontainer">
  
              <!-- layout for event name -->
              <v-layout row>
                <v-flex class="hidden-sm-and-down" md4>
                  <v-subheader class="fields">Event Name</v-subheader>
                </v-flex>
                <v-flex xs12 md8>
                  <v-text-field label="Enter your event's name" :error-messages="EventNameErrors" v-model.lazy="EventName" prepend-icon="euro_symbol" required @blur="delayTouch($v.EventName,200)" @input="delayTouch($v.EventName,200)">
                  </v-text-field>
                </v-flex>
              </v-layout>
  
              <!-- layout for venues -->
              <v-layout row wrap>
                <v-flex class="hidden-sm-and-down" md4>
                  <v-subheader class="fields">Select Venue</v-subheader>
                </v-flex>
                <v-flex xs12 md8>
                  <v-autocomplete class="select__box" :items="venues" v-model.lazy="venue" item-text="name" item-value="_id" label="Select Venue" prepend-icon="edit_location" autocomplete :error-messages="venueErrors" @blur="delayTouch($v.venue,200)" @input="delayTouch($v.venue,200)"></v-autocomplete>
                </v-flex>
              </v-layout>
  
              <!-- layout for start date -->
              <v-layout row>
                <v-flex class="hidden-sm-and-down" md4>
                  <v-subheader class="fields">Start Date</v-subheader>
                </v-flex>
                <v-flex xs12 md8>
                  <v-menu ref="startmenu" lazy :close-on-content-click="false" v-model="startmenu" transition="scale-transition" offset-y full-width :nudge-right="40" min-width="290px" :return-value.sync="startDate">
                    <v-text-field slot="activator" label="Select Start Date" v-model.lazy="startDate" prepend-icon="date_range" readonly required :error-messages="startDateErrors" @blur="delayTouch($v.startDate,200)" @input="delayTouch($v.startDate,200)"></v-text-field>
                    <v-date-picker v-model="startDate" :allowed-dates="validDates" scrollable>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="startmenu = false">Cancel</v-btn>
                      <v-btn flat color="primary" @click="$refs.startmenu.save(startDate)">OK</v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-flex>
              </v-layout>
  
              <!-- layout for end date -->
              <v-layout row>
                <v-flex class="hidden-sm-and-down" md4>
                  <v-subheader class="fields">End Date</v-subheader>
                </v-flex>
                <v-flex xs12 md8>
                  <v-menu ref="endmenu" lazy :close-on-content-click="false" v-model="endmenu" transition="scale-transition" offset-y full-width :nudge-right="40" min-width="290px" :return-value.sync="endDate">
                    <v-text-field slot="activator" label="Select End Date" v-model.lazy="endDate" prepend-icon="date_range" readonly required :error-messages="endDateErrors" @blur="delayTouch($v.endDate,200)" @input="delayTouch($v.endDate,200)"></v-text-field>
                    <v-date-picker v-model="endDate" :allowed-dates="validDates" scrollable>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="endmenu = false">Cancel</v-btn>
                      <v-btn flat color="primary" @click="$refs.endmenu.save(endDate)">OK</v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-flex>
              </v-layout>
  
              <!-- layout for start time -->
              <v-layout row>
                <v-flex class="hidden-sm-and-down" md4>
                  <v-subheader class="fields">Start Time</v-subheader>
                </v-flex>
                <v-flex xs12 md8>
                  <v-menu ref="startTimemenu" lazy :close-on-content-click="false" v-model="stmenu" transition="scale-transition" offset-y full-width :nudge-right="40" max-width="290px" min-width="290px" :return-value.sync="startTime">
                    <v-text-field slot="activator" label="Starting Time" v-model.lazy="startTime" prepend-icon="alarm" readonly required :error-messages="startTimeErrors" @blur="delayTouch($v.startTime,200)" @input="delayTouch($v.startTime,200)"></v-text-field>
  
                    <v-time-picker v-model="startTime" min="9:30" max="19:00" format="24hr" @change="$refs.startTimemenu.save(startTime)"></v-time-picker>
                  </v-menu>
                </v-flex>
              </v-layout>
  
              <!-- layout for end time -->
              <v-layout row>
                <v-flex class="hidden-sm-and-down" md4>
                  <v-subheader class="fields">End Time</v-subheader>
                </v-flex>
                <v-flex xs12 md8>
                  <v-menu ref="endTimemenu" lazy :close-on-content-click="false" v-model="etmenu" transition="scale-transition" offset-y full-width :nudge-right="40" max-width="290px" min-width="290px" :return-value.sync="endTime">
                    <v-text-field slot="activator" label="Ending Time" v-model.lazy="endTime" prepend-icon="alarm" readonly required :error-messages="endTimeErrors" @blur="getdata(),delayTouch($v.endTime,200)" @input="delayTouch($v.endTime,200)"></v-text-field>
  
                    <v-time-picker v-model="endTime" min="9:30" max="19:00" format="24hr" @change="$refs.endTimemenu.save(endTime)"></v-time-picker>
                  </v-menu>
                </v-flex>
              </v-layout>
  
              <v-layout>
                <v-flex class="hidden-sm-and-down" md4>
                  <v-subheader class="fields">Description</v-subheader>
                </v-flex>
                <v-flex xs12 md8>
                  <v-text-field label="Description" v-model.lazy="description" counter="140" single-line auto-grow prepend-icon="description" :error-messages="descriptionErrors" required @blur="delayTouch($v.description,200)" @input="delayTouch($v.description,2000)">
                  </v-text-field>
                </v-flex>
              </v-layout>
  
              <!-- layoout for cordinator name-->
              <v-layout>
                <v-flex class="hidden-sm-and-down" md4>
                  <v-subheader class="fields">Co-ordinator's Name</v-subheader>
                </v-flex>
                <v-flex xs12 md8>
                  <v-text-field label="Enter Co-ordinator's Name" v-model.lazy="coordinatorName" prepend-icon="record_voice_over" required :error-messages="coordinatorNameErrors" @blur="delayTouch($v.coordinatorName,200)" @input="delayTouch($v.coordinatorName,200)">
                  </v-text-field>
                </v-flex>
              </v-layout>
  
              <!-- layoout for cordinator phone-->
              <v-layout>
                <v-flex class="hidden-sm-and-down" md4>
                  <v-subheader class="fields">Co-ordinator's Number</v-subheader>
                </v-flex>
                <v-flex xs12 md8>
                  <v-text-field name="coordinatorphone" label="Enter Co-ordinator's Number" single-line v-model.number="coordinatorPhone" type="tel" prepend-icon="phone_iphone" required :error-messages="coordinatorPhoneErrors" @blur="delayTouch($v.coordinatorPhone,200)"
                    @input="delayTouch($v.coordinatorPhone,200)"></v-text-field>
                </v-flex>
              </v-layout>
  
              <!-- layout for form Url-->
              <v-layout>
                <v-flex class="hidden-sm-and-down" md4>
                  <v-subheader class="fields">Form Url</v-subheader>
                </v-flex>
                <v-flex xs12 md8>
                  <v-text-field name="formurl" label="Enter Form Url" v-model.lazy="formUrl" single-line prepend-icon="share" required :error-messages="formUrlErrors" @blur="delayTouch($v.formUrl,200)" @input="delayTouch($v.formUrl,200)"></v-text-field>
                </v-flex>
              </v-layout>
  
              <v-dialog v-model="eventclash" max-width="400">
                <event-clash :clashEvents="sendEvents"></event-clash>
  
              </v-dialog>
  
              <!-- event created modal -->
  
              <v-dialog v-model="eventreg" max-width="500" style="height:90%;">
                <event-success  head="Success" icon="thumb_up" SuccessMessage="Event has been editted successfully."  @clicked="closing()" ></event-success>
              </v-dialog>
            </v-container>
          </v-form>
        </div>
      </form-container>
    </v-container>
  </v-app>
</template>


<script>
import CommonRequest from "@/services/CommonRequest";

import SocietyRequest from "../services/SocietyRequest";
const FormContainer = () => import("./FieldComponents/FormContainer.vue");
const Navbar = () => import("./Navbar.vue");
const EventClash = () => import("./Dialogs/EventClash.vue");
const EventSuccess = () => import("./Dialogs/EventSuccess.vue");
import { validationMixin } from "vuelidate";
import { required, minLength, maxLength } from "vuelidate/lib/validators";

import { deburr, debounce } from "lodash";
const touchMap = new WeakMap();
export default {
  components: {
    navbar: Navbar,
    "form-container": FormContainer,
    "event-clash": EventClash,
    "event-success": EventSuccess
  },
  mixins: [validationMixin],
  data() {
    return {
      // v-model data
      id: "",
      EventName: "",
      venue: null,
      startDate: "",
      endDate: "",
      startTime: null,
      endTime: null,
      description: "",
      coordinatorName: "",
      coordinatorPhone: "",
      formUrl: "",
      eventreg: false,
      eventfail: false,

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
      clashEvents: [],
      sendEvents: [],

      endTimemenu: false,
      etmenu: false,

      //FOR INPUT VALIDATION
      error: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ],
      failerror: "",
      valid: true,

      //FOR ALL VENUES
      venues: []
    };
  },
  beforeCreate: async function() {
    try {
      let soc = [0, 1, 2];
      const response = await CommonRequest.validateUser();
      if (!soc.includes(response.data.flag)) {
        this.$router.push("/login");
      } else {
        try {
          let venueList = await CommonRequest.getVenues();
          this.venues = venueList.data.venues;
        } catch (error) {
          if (error) console.log(error);
        }
      }
    } catch (error) {
      if (error) {
        this.$router.push("/login");
      }
    }
  },
  created: async function() {
    const id = localStorage.getItem("id");
    if (id) {
      const response = await SocietyRequest.getEventById({
        id
      });
      let eventDetail = response.data.returnEvent[0];
      this.id = eventDetail._id;
      this.EventName = eventDetail.name;
      this.venue = eventDetail.venueId;

      let start = eventDetail.date.startDate.split("T");
      this.startDate = start[0];
      this.startTime = start[1].split(":00.")[0];
      let end = eventDetail.date.endDate.split("T");
      this.endDate = end[0];
      this.endTime = end[1].split(":00.")[0];
      this.description = eventDetail.description;
      this.coordinatorName = eventDetail.coordinator.name;
      this.coordinatorPhone = eventDetail.coordinator.phone;
      this.formUrl = eventDetail.formUrl;
    } else {
      this.$router.push("/Status");
    }
  },
  computed: {
    EventNameErrors() {
      const errors = [];
      if (!this.$v.EventName.$dirty) return errors;
      !this.$v.EventName.required && errors.push("EventName is required.");
      !this.$v.EventName.minLength &&
        errors.push("EventName should be more than 5 characters long");
      !this.$v.EventName.maxLength &&
        errors.push("EventName must be at most 60 characters long");
      if (errors.length > 0) this.error[0] = true;
      else this.error[0] = false;
      return errors;
    },
    venueErrors() {
      const errors = [];
      if (!this.$v.venue.$dirty) return errors;
      !this.$v.venue.required && errors.push("This field is required");
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
      !this.$v.endTime.required && errors.push("end time is required.");
      !(
        Date.parse(`${this.endDate}T${this.endTime}Z`) >
        Date.parse(`${this.startDate}T${this.startTime}Z`)
      ) && errors.push("end time should be greater than start time");

      let start = this.startTime.split(":");
      var end = this.endTime.split(":");
      if (start[0] > end[0])
        errors.push("end time should be greater than start time");
      else if (start[0] == end[0]) {
        if (start[1] >= end[1])
          errors.push("end time should be greater than start time");
      }

      if (errors.length > 0) this.error[5] = true;
      else this.error[5] = false;
      return errors;
    },
    descriptionErrors() {
      const errors = [];
      if (!this.$v.description.$dirty) return errors;
      !this.$v.description.required && errors.push("description is required.");
      !this.$v.description.minLength &&
        errors.push("description should be more than 130 characters long");
      !this.$v.description.maxLength &&
        errors.push("description must be at most 140 characters long");
      if (errors.length > 0) this.error[6] = true;
      else this.error[6] = false;
      return errors;
    },
    coordinatorNameErrors() {
      const errors = [];
      if (!this.$v.coordinatorName.$dirty) return errors;
      !this.$v.coordinatorName.required &&
        errors.push("coordinatorName is required.");
      !this.$v.coordinatorName.minLength &&
        errors.push("coordinatorName should be more than 5 characters long");
      !this.$v.coordinatorName.maxLength &&
        errors.push("coordinatorName must be at most 60 characters long");
      !this.coordinatorName.match(/^[A-Za-z .'-]+$/) &&
        errors.push("Please specify your coordinatorName in correct format");
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
      !this.$v.formUrl.required && errors.push("form Url is required.");
      if (errors.length > 0) this.error[9] = true;
      else this.error[9] = false;
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
      minLength: minLength(130),
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
    }
  },
  methods: {
    closing: function() {
      this.eventreg = false;
    },
    getdata: debounce(async function() {
      if (
        this.startDate &&
        this.endDate &&
        this.startTime &&
        this.endTime &&
        this.venue
      ) {
        if (!this.error[5]) {
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

          if (response.data.length > 1) {
            this.clashEvents = response.data;

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

            for (let event of this.clashEvents) {
              if (event.id == localStorage.getItem("id")) {
              } else {
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
                this.sendEvents.push(event);
              }
            }
            this.error[10] = true;
            this.eventclash = true;
          } else {
            this.eventclash = false;

            this.error[10] = false;
          }
        }
      }
    }, 700),
    updateEvent: async function() {
      try {
        const response = await SocietyRequest.editEvent({
          id: this.id,
          name: deburr(this.EventName),
          description: deburr(this.description),
          venueId: this.venue._id,
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
            phone: this.coordinatorPhone
          },
          formUrl: this.formUrl
        });
        await localStorage.removeItem("id");
        this.eventreg = true;
      } catch (err) {
        if (err) this.failerror = err.response.data.replace(/"/g, "");
        else this.failerror = "Internal Server Error";
        this.eventfail = true;
      }
    },
    delayTouch: function($v, time) {
      $v.$reset();
      if (touchMap.has($v)) clearTimeout(touchMap.get($v));
      touchMap.set($v, setTimeout($v.$touch, time));
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

.heightAdjust {
  height: 90%;
}
</style>