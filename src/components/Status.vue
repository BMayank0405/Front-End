<template>
  <v-app>
    <navbar></navbar>
    <v-container class="centering" grid-list-lg>
  
      <!-- accepted events -->
      <v-layout row wrap justify-space-around v-if="acceptedEvents.length > 0">
        <page-header>
          <span slot="pageheader" class="flex-center" style="text-transform:capitalize">Approved Events</span>
        </page-header>
        <v-flex sm12 md6 class="card__style" v-for="event in acceptedEvents" :key="event._id">
          <event-card :event="event">
            <div slot="cardButton">
              <card-button :animation="false" buttonName="Edit" icon="create" :returnParam="event._id" @clicked="edit(event._id)">
              </card-button>
            </div>
          </event-card>
  
        </v-flex>
      </v-layout>
  
      <!-- accepted events -->
      <v-layout row wrap justify-space-around v-if="editEvents.length > 0">
        <page-header>
          <span slot="pageheader" class="flex-center" style="text-transform:capitalize">Edit Events</span>
        </page-header>
        <v-flex sm12 md6 class="card__style" v-for="event in editEvents" :key="event._id">
          <event-card :event="event">
            <div slot="cardButton">
              <card-button :animation="false" buttonName="Edit" icon="create" :returnParam="event._id" @clicked="edit(event._id)">
              </card-button>
            </div>
          </event-card>
  
        </v-flex>
      </v-layout>
  
      <!-- accepted events -->
      <v-layout row wrap justify-space-around v-if="pendingEvents.length > 0">
        <page-header>
          <span slot="pageheader" class="flex-center" style="text-transform:capitalize">Pending Events</span>
        </page-header>
        <v-flex sm12 md6 class="card__style" v-for="event in pendingEvents" :key="event._id">
          <event-card :event="event">
            <div slot="cardButton">
              <card-button :animation="false" buttonName="Edit" icon="create" :returnParam="event._id" @clicked="edit(event._id)">
              </card-button>
            </div>
          </event-card>
  
        </v-flex>
      </v-layout>
  
      <!-- accepted events -->
      <v-layout row wrap justify-space-around v-if="rejectedEvents.length > 0">
        <page-header>
          <span slot="pageheader" class="flex-center" style="text-transform:capitalize">Rejected Events</span>
        </page-header>
        <v-flex sm12 md6 class="card__style" v-for="event in rejectedEvents" :key="event._id">
          <event-card :event="event">
            <div slot="cardButton">
              <card-button :animation="false" buttonName="Edit" icon="create" :returnParam="event._id" @clicked="edit(event._id)">
              </card-button>
            </div>
          </event-card>
  
        </v-flex>
      </v-layout>
  
    </v-container>
  </v-app>
</template>



<script>
import CommonRequest from "@/services/CommonRequest";

// code-splitted imports
const CardHeader = () => import("./Card/CardHeader");
const Card = () => import("./Card/Card");
const CardButton = () => import("./Card/CardButton");
const PageHeader = () => import("./Commons/PageHeader.vue");
const Navbar = () => import("./Navbar");
import SocietyRequest from "@/services/SocietyRequest";

export default {
  data() {
    return {
      events: [],
      acceptedEvents: [],
      rejectedEvents: [],
      pendingEvents: [],
      editEvents: []
    };
  },
  components: {
    navbar: Navbar,
    "card-header": CardHeader,
    "event-card": Card,
    "card-button": CardButton,
    "page-header": PageHeader
  },
  beforeCreate: async function() {
    let soc = [0, 1, 2];
    try {
      const response = await CommonRequest.validateUser();
      if (!soc.includes(response.data.flag)) {
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
      const eventList = await SocietyRequest.status();
      this.events = eventList.data.returnEvent;
      this.pendingEvents = this.events[0].pending;
      this.rejectedEvents = this.events[1].rejected;
      this.acceptedEvents = this.events[2].accepted;
      this.editEvents = this.events[3].edit;
    } catch (error) {
      if (error) console.log(error);
    }
  },
  methods: {
    edit: async function(id) {
      localStorage.setItem("id", id);
      this.$router.push("/editEvent");
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

