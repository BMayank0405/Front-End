<template>
  <div>  
    <navbar :searchBar="true" @search="search"></navbar>
    <v-container class="centering" grid-list-lg>
      <transition-group name="cell" tag="div" class="layout row wrap justify-space-around">
        <v-flex sm12 md6 class="card__style" v-for="event in search_array" :key="event._id">
          <event-card :event="event">
            <div slot="cardHeader">
              <card-header :name="event.society"></card-header>
            </div>
            <div slot="cardButton">
              <v-layout justify-center class="down_arrow">
                <v-icon large>keyboard_arrow_down</v-icon>
              </v-layout>
              <card-button :animation="true" buttonName="Register Here" :icon="refreshIcon()" :returnParam="event.formUrl" @clicked="register">
              </card-button>
            </div>
          </event-card>
  
        </v-flex>
      </transition-group>


    </v-container>
    </div>
</template>



<script>
import HeaderlessRequest from "@/services/HeaderlessRequest";
import Card from "./Card/Card";
import CardHeader from "./Card/CardHeader";
import CardButton from "./Card/CardButton";
import Navbar from "./Navbar.vue";

import { sample } from "lodash";
let resp = [];
export default {
  data() {
    return {
      events: [],
      search_array: [],
      icon_array: [
        "party_mode",
        "grain",
        "bubble_chart",
        "add_alert",
        "send",
        "toys",
        "local_play",
        "flare"
      ]
    };
  },
  components: {
    navbar: Navbar,
    "card-header": CardHeader,
    "event-card": Card,
    "card-button": CardButton
  },
  methods: {
    register: function(formUrl) {
      let win = window.open(formUrl);
    },
    refreshIcon: function() {
      return sample(this.icon_array);
    },
    search: function(societies) {
      if (societies[0] == null) this.search_array = this.events;
      else {
        this.search_array = this.events.filter(event => {
          for (let society of societies) {
            if (society == event.societyId) return event;
          }
        });
      }
    }
  },
  beforeCreate: () => {
    resp = HeaderlessRequest.getEvent();
  },
  created: async function() {
    let response = await resp;
    this.events = this.search_array = response.data.returnEvent;
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
  margin-top: 2rem;
  @media screen and (max-width: 400px) {
    & {
      margin-top: 1rem;
    }
  }
}

.cell-move {
  transition: transform 600ms;
}

.down_arrow {
  margin-top: 20px;
  & > i {
    transform: scale(1.5);
    animation: moveArrow 3s steps(8, end) infinite;
  }
}

@keyframes moveArrow {
  from {
    transform: scale(1.7);
    opacity: 0.6;
  }
  to {
    transform: translateY(17px) scale(1.7);
    opacity: 0;
  }
}
</style>

