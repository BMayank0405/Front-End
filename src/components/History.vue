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
  
      <v-dialog v-model="editmodal" @input="resetOpacity()" lazy persistent max-width="500px">
        <suggest-edit @clicked="edit"></suggest-edit>
  
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

export default {
  components: {
    navbar: Navbar,
    "card-header": CardHeader,
    "event-card": Card,
    "card-button": CardButton,
    "page-header": PageHeader,
    "suggest-edit": SuggestEdit
  },
  data() {
    return {
      events: [],
      acceptedEvents: [],
      rejectedEvents: [],
      editmodal: false,
      editId: null
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
    resetOpacity: function() {
      this.editmodal = false;
    },
    edit: async function(value) {
      const response = await FacultyRequest.suggestEdit({
        id: this.editId,
        edit: value
      });
    },
    suggestEdit: function(id) {
      this.editId = id;
      this.editmodal = true;
    },
    accept: async function(id) {
      try {
        const response = await FacultyRequest.historyAccept({
          id: id
        });
        this.$router.push("/pendingEvents");
      } catch (err) {}
    },
    reject: async function(id) {
      try {
        const response = await FacultyRequest.historyReject({
          id: id
        });
        this.$router.push("/pendingEvents");
      } catch (err) {}
    }
  },
  watch: {
    editmodal: async function() {
      let el = this.$refs.background;
      if (this.editmodal) el.style.opacity = 0.2;
      else el.style.opacity = 1;
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

