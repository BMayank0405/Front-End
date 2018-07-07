<template>
  <v-app>
    <navbar :searchBar="false"></navbar>
    <v-container class="centering" grid-list-lg>
      <v-layout ref="pendingback" row wrap justify-space-around>
        <transition-group name="cell" tag="div" class="event__card">
          <v-flex sm12 md6 class="card__style" v-for="event in events" :key="event._id">
            <event-card :event="event">
              <div slot="cardHeader">
                <card-header :name="event.society"></card-header>
              </div>
              <div slot="cardButton">
                <v-layout d-inline-flex justify-center style="width:100%; transform:translateX(5px);z-index:5">
                  <card-button buttonName="Accept" icon="done_all" :returnParam="event._id" @clicked="accept">
                  </card-button>
                  <card-button buttonName="reject" icon="delete_sweep" :returnParam="event._id" @clicked="reject">
                  </card-button>
                  <card-button buttonName="Suggest Edit" icon="create" :returnParam="event._id" @clicked="suggestEdit(event._id)">
                  </card-button>
                </v-layout>
              </div>
            </event-card>
  
          </v-flex>
        </transition-group>
      </v-layout>
  
  
      <!-- <v-dialog v-model="editmodal"  max-width="500px">
        <suggest-edit @clicked="edit"></suggest-edit>
      </v-dialog>
  
      <v-dialog v-model="Success" @input="window.location.reload()" max-width="500px">
        <event-success :SuccessMessage="successMessage"></event-success>
      </v-dialog>
  
      <v-dialog v-model="Failure" @input="window.location.reload()" max-width="500px">
        <event-fail :error="failerror"></event-fail>
      </v-dialog> -->
    </v-container>
  
  
  </v-app>
</template>



<script>
import CommonRequest from "@/services/CommonRequest";
import FacultyRequest from "@/services/FacultyRequest";

const CardHeader = () => import("./Card/CardHeader");
const Card = () => import("./Card/Card");
const Navbar = () => import("./Navbar.vue");
const CardButton = () => import("./Card/CardButton");
const SuggestEdit = () => import("./Dialogs/SuggestEdit");
const EventSuccess = () => import("./Dialogs/EventSuccess");

export default {
  components: {
    navbar: Navbar,
    "card-header": CardHeader,
    "event-card": Card,
    "card-button": CardButton,
    "suggest-edit": SuggestEdit,
    "event-success": EventSuccess
  },
  data() {
    return {
      events: [],
      editmodal: false,
      editId: null,
      Success: false,
      successMessage: "",
      Failure: false,
      failerror: "",
      modalActive: false
    };
  },
  beforeCreate: async function() {
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
      const response = await FacultyRequest.pendingEvents();
      this.events = response.data.returnEvent;
    } catch (err) {
      if (err) this.failerror = err.response.data;
      else this.failerror = "Internal Server Error";
      this.Failure = true;
    }
  },
  methods: {
    resetOpacity: function() {
      this.modalActive = false;
    },
    suggestEdit: function(id) {
      this.editId = id;
      this.editmodal = true;
    },
    edit: async function(value) {
      try {
        await FacultyRequest.suggestEdit({
          id: this.editId,
          edit: value
        });
        this.successMessage =
          "Event has been successfully put in editing phase";
        this.modalActive = true;
        this.Success = true;
      } catch (err) {
        if (err) this.failerror = err.response.data;
        else this.failerror = "Internal Server Error";
        this.modalActive = true;
        this.Failure = true;
      }
    },
    accept: async function(id) {
      try {
        await FacultyRequest.approve({
          id: id
        });
        this.successMessage = "Event has been successfully Accepted";
        this.modalActive = true;
        this.Success = true;
      } catch (err) {
        if (err) this.failerror = err.response.data;
        else this.failerror = "Internal Server Error";
        this.modalActive = true;
        this.Failure = true;
      }
    },
    reject: async function(id) {
      try {
        await FacultyRequest.decline({
          id: id
        });
        this.successMessage = "Event has been successfully rejected";
        this.modalActive = true;
        this.Success = true;
      } catch (err) {
        if (err) this.failerror = err.response.data;
        else this.failerror = "Internal Server Error";
        this.modalActive = true;
        this.Failure = true;
      }
    }
  },
  watch: {
    modalActive: async function() {
      let el = this.$refs.pendingback;
      if (this.modalActive) el.style.opacity = 0.2;
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

.event__card {
  display: inline-flex;
  justify-content: center;
}

.card__style {
  perspective: 1000px;
  transform-style: preserve-3d;
  margin: 1rem;
  margin-top: 2rem;
}

.cell-move {
  transition: transform 600ms;
}
</style>

