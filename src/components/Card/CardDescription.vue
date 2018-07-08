<template>
  <div>
    <v-card-text>
      <h1 class="mx-auto"> {{eventName}} </h1><br>
    </v-card-text>
    <v-card-text>
      <article class="pa-0">{{description}}</article><br>
    </v-card-text>
    <v-card-text class="pb-1">
      <!-- div for date -->
      <div>
        Date : <span>{{startDate}}</span><span v-if="!dateflag"> - {{endDate}}</span>
      </div>
    </v-card-text>
    <v-card-text class="pb-1">
      <!-- div for time -->
      <div>
        Timings : <span>{{startTime}}</span> - <span>{{endTime}}</span>
      </div>
    </v-card-text>
  
    <v-card-text class="pb-1">
      <div>
        Venue : <span>{{venue}}</span>
      </div>
    </v-card-text>
  </div>
</template>


<script>
export default {
  props: {
    eventName: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    sDate: {
      type: Promise,
      required: true
    },
    eDate: {
      type: Promise,
      required: true
    },
    sTime: {
      type: Promise,
      required: true
    },
    eTime: {
      type: Promise,
      required: true
    },
    venue: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      dateflag: false,
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: ""
    };
  },
  created: async function() {
    this.startDate = await this.sDate;
    this.endDate = await this.eDate;
    this.startTime = await this.sTime;
    this.endTime = await this.eTime;
    this.dateflag = this.startDate == this.endDate;
  }
};
</script>

<style lang="scss" scoped>
$delay: 1.2s;
.v-card__text {
  position: relative;
  z-index: 4;
  display: flex;
  justify-content: flex-start;
  &:first-of-type {
    justify-content: center;
    perspective: 1000px;
    & > h1 {
      font: {
        family: "Berkshire Swash", cursive !important;
        size: 2.03rem;
      }

      text-transform: capitalize;
      text-align-last: center;
      text-align: justify;
      width: 80%;
      opacity: 0;
      letter-spacing: 0.05rem;
      animation: show 1.5s ($delay + 1s) ease-in, up 0.5s ($delay + 3s) ease-in;
      animation-fill-mode: forwards;
      filter: drop-shadow(3px 3px 6px rgba(0, 0, 0, 0.5));
    }
  }
  & > div {
    z-index: 4;
    font: {
      family: "Lora", serif !important;
      size: 1.3rem;
    }
    & > span {
      z-index: 4;
      text-transform: capitalize;
    }
  }
  & > article {
    font: {
      size: 1.5rem;
      family: "Yatra One", cursive !important;
      weight: 300;
    }
    text-align: justify;
  }
  &:not(:first-of-type) {
    padding-top: 5px;
  }
}

@media screen and (max-width: 400px) {
  .v-card__text {
    &:first-of-type {
      padding: 8px;
      & > h1 {
        font-size: 1.65rem;
      }
    }
    & > div {
      font-size: 1rem;
    }
    & > article {
      font-size: 1.2rem;
    }
  }
}

@keyframes show {
  from {
    opacity: 0;
    transform: rotateY(-90deg);
  }
  to {
    opacity: 1;
    transform: rotateY(0deg);
  }
}

@keyframes up {
  0% {
    text-shadow: 0 0 0 0;
    transform: translateY(0px);
  }
  25% {
    text-shadow: 0.1px 0.1px 0.3px;
    transform: translateY(-2px);
  }
  50% {
    transform: translateY(0px);
    text-shadow: 0.2px 0.2px 0.6px;
  }
  75% {
    transform: translateY(2px);
    text-shadow: 0.3px 0.3px 0.9px;
  }
  100% {
    transform: translateY(0px);
    text-shadow: 0.5px 0.5px 1.5px;
  }
}
</style>
