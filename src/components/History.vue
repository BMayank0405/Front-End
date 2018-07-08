<template>
  <v-app>
    <navbar :searchBar="false"></navbar>
    <v-container class="centering" grid-list-lg>
  
      <!-- accepted events -->
      <v-layout ref="background" row wrap justify-space-around v-if="acceptedEvents.length > 0">
        <page-header>
          <span slot="pageheader" class="flex-center" style="text-transform:capitalize">Approved Events</span>
        </page-header>
        <v-flex sm12 md6 class="card__style" v-for="(event,index) in acceptedEvents" :key="index">
          <event-card :event="event">
            <div slot="cardHeader">
              <card-header :name="event.society"></card-header>
            </div>
            <div slot="cardButton">
              <v-layout d-inline-flex justify-center style="width:100%">
                <card-button :animation="false" buttonName="Reject" icon="delete_sweep" :returnParam="event._id" @clicked="reject(event._id)">
                </card-button>
                <card-button :animation="false" buttonName="Suggest Edit" icon="create" :returnParam="event._id" @clicked="suggestEdit(event._id)">
                </card-button>
              </v-layout>
            </div>
          </event-card>
  
        </v-flex>
      </v-layout>
  
      <!-- rejected events -->
      <v-layout row wrap justify-space-around v-if="rejectedEvents.length > 0">
        <page-header>
          <span slot="pageheader" class="flex-center" style="text-transform:capitalize">Rejected Events</span>
        </page-header>
        <v-flex sm12 md6 class="card__style" v-for="(event,index) in rejectedEvents" :key="index">
          <event-card :event="event">
            <div slot="cardHeader">
              <card-header :name="event.society"></card-header>
            </div>
            <div slot="cardButton">
              <v-layout d-inline-flex justify-center style="width:100%">
                <card-button :animation="false" buttonName="Accept" icon="done_all" :returnParam="event._id" @clicked="accept(event._id)">
                </card-button>
                <card-button :animation="false" buttonName="Suggest Edit" icon="create" :returnParam="event._id" @clicked="suggestEdit(event._id)">
                </card-button>
              </v-layout>
            </div>
          </event-card>
  
  
        </v-flex>
      </v-layout>

      <v-layout  row wrap justify-space-around v-if = "(rejectedEvents.length == 0) && (acceptedEvents.length == 0)">
                <page-header>
          <span slot="pageheader" class="flex-center" style="text-transform:capitalize">Nothing to show</span>
        </page-header>
      </v-layout>
  
      <v-dialog v-model="editmodal" max-width="500px">
        <suggest-edit @clicked="edit"></suggest-edit>
      </v-dialog>
  
      <v-dialog v-model="resp" max-width="500">
        <generic-response :message="response" :header="dialogHeader" :icon="dialogIcon" @clicked="resp = false"></generic-response>
      </v-dialog>
  
      <v-dialog v-model="eventreg" max-width="500">
        <event-success head="Success" icon="thumb_up" SuccessMessage="Event has been accepted Successfully." @clicked="closing()"></event-success>
      </v-dialog>
    </v-container>
  </v-app>
</template>



<script>
import CommonRequest from "@/services/CommonRequest";
import FacultyRequest from "@/services/FacultyRequest";

// code-splitted imports
const CardHeader = () => import("./Card/CardHeader");
const Card = () => import("./Card/Card");
const CardButton = () => import("./Card/CardButton");
const PageHeader = () => import("./Commons/PageHeader.vue");
const Navbar = () => import("./Navbar");
const SuggestEdit = () => import("./Dialogs/SuggestEdit.vue");
const EventSuccess = () => import("./Dialogs/EventSuccess");

const GenericResponse = () => import("./Dialogs/GenericResponse");

export default {
  components: {
    navbar: Navbar,
    "card-header": CardHeader,
    "event-card": Card,
    "card-button": CardButton,
    "page-header": PageHeader,
    "suggest-edit": SuggestEdit,
    "event-success": EventSuccess,
    "generic-response": GenericResponse
  },
  data() {
    return {
      events: [],
      acceptedEvents: [],
      rejectedEvents: [],
      editmodal: false,
      editId: null,
      eventreg: false,
      resp: false,
      response: "",
      dialogIcon: "",
      dialogHeader: ""
    };
  },
  beforeCreate: async () => {
    let valid_faculty = [3, 4];
    try {
      const response = await CommonRequest.validateUser();
      if (!valid_faculty.includes(response.data.flag))
        this.$router.push("/login");
    } catch (error) {
      if (error) this.$router.push("/login");
    }
  },
  created: async function() {
    try {
      const eventList = await FacultyRequest.history();
      this.events = eventList.data.returnEvent;
      this.acceptedEvents = this.events[0].accepted;
      this.rejectedEvents = this.events[1].rejected;
    } catch (error) {
      if (error) console.log(error);
    }
  },
  methods: {
    edit: async function(value) {
      try {
        await FacultyRequest.suggestEdit({
          id: this.editId,
          edit: value
        });
        this.editmodal = false;
        this.response = "Event has been successfully put in editing phase";
        this.dialogIcon = "thumb_up";
        this.dialogHeader = "Congrats";
        this.resp = true;
      } catch (err) {
        if (err) this.response = err.response.data.replace(/"/g, "");
        else this.response = "Internal Server Error";
        this.editmodal = false;
        this.dialogIcon = "report";
        this.dialogHeader = "Sorry";
        this.resp = true;
      }
    },
    suggestEdit: function(id) {
      this.editId = id;
      this.editmodal = true;
    },
    accept: async function(id) {
      try {
        await FacultyRequest.historyAccept({
          id: id
        });
        this.eventreg = true;
      } catch (err) {
        if (err) this.response = err.response.data.replace(/"/g, "");
        else this.response = "Internal Server Error";

        this.dialogIcon = "report";
        this.dialogHeader = "Sorry";
        this.resp = true;
      }
    },
    reject: async function(id) {
      try {
        await FacultyRequest.historyReject({
          id: id
        });
        this.response = "Event has been successfully rejected";
        this.dialogIcon = "thumb_up";
        this.dialogHeader = "Congrats";
        this.resp = true;
      } catch (err) {
        if (err) this.response = err.response.data.replace(/"/g, "");
        else this.response = "Internal Server Error";
        this.dialogIcon = "report";
        this.dialogHeader = "Sorry";
        this.resp = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@media screen and (min-width: 1000px) {
  .card__style {
    max-width: 43%;
  }
}

.card__style {
  perspective: 1000px;
  transform-style: preserve-3d;
  margin: 1rem;
  margin-top: 2rem;
}

.flex-center {
  display: flex;
  justify-content: center;
  width: 100%;
}
</style>

