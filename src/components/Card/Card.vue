<template>
<transition name="card" appear>
  <v-card hover dark raised :class="[event.color, `${event.shade}-3`]" class="white--text MidHeight card" ref="eventCard">
  
    <slot name="cardHeader"></slot>
  
    <div class="hut"></div>
    <card-description :eventName="event.name" :description="event.description" :sDate="event.startdate" :eDate="event.enddate" :sTime="event.starttime" :eTime="event.endtime" :venue="event.venue">
    </card-description>
  
    <!-- div for design -->
    <div class="interaction">
      <div :class="[event.color, `${event.shade}-2`]"  ref="bubble"></div>
    </div>
  
    <slot name="cardButton"></slot>
  
  </v-card>
  </transition>
</template>

<script>
import { sample } from "lodash";
import CardDescription from "./CardDescription";

export default {
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  components: {
    "card-description": CardDescription
  },
  data() {
    return {
      colorArray: [
        "purple",
        "deep-purple",
        "light-blue",
        "red",
        "green",
        "indigo",
        "cyan"
      ],
      shades: ["darken", "accent"],
      height: ""
    };
  },
  created: async function() {
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

    let start = new Date(this.event.date.startDate);

    let end = new Date(this.event.date.endDate);
    let Worker = this.$worker.create(actions);
    this.event.startdate = Worker.postMessage("dateformat", [start]);
    this.event.enddate = Worker.postMessage("dateformat", [end]);

    this.event.starttime = Worker.postMessage("timeformat", [start]);
    this.event.endtime = Worker.postMessage("timeformat", [end]);

    this.event.color = sample(this.colorArray);

    this.event.shade = sample(this.shades);
  },
  mounted: function() {
    this.center();
  },
  methods: {
    register: function(formUrl) {
      let win = window.open(formUrl);
    },
    center: function() {
      let outer_card = this.$refs.eventCard;
      let element = this.$refs.bubble;
      setTimeout(function() {
        let card = outer_card.$el.getBoundingClientRect();
        let half = card.height / 2;
        let card_y = card.y;
        let rel_y = element.getBoundingClientRect().y - card_y;
        let place = Math.abs(rel_y - half);
        element.style.visibility = "visible";
        let bubbling = [
          {
            transform: `translateY(-${place}px) scale(1, 1)`,
            opacity: 0.8
          },
          {
            transform: `translateY(-${place}px) scale(2.5, 2.5)`,
            opacity: 0.5
          },
          {
            transform: `translateY(-${place}px) scale(5, 5)`,
            opacity: 0.2
          },
          {
            transform: `translateY(-${place}px) scale(2.5, 2.5)`,
            opacity: 0.5
          },
          {
            transform: `translateY(-${place}px) scale(1, 1)`,
            opacity: 0.8
          }
        ];
        element.animate(bubbling, {
          duration: 6000,
          direction: "alternate",
          iterations: Infinity
        });
      }, 5800);
    }
  }
};
</script>


<style lang="scss" scoped>
$delay: 0.5s;
$border_radius: 15px;
$circle: 50px;
$x: calc(50% - 25px);

.card {
  position: relative;
  border-radius: $border_radius;
  overflow: hidden;
}
.card-enter,
.card-leave-to {
  filter: blur(2px) grayscale(100%) drop-shadow(40px 40px rgba(0, 0, 0, 0.3));
  transform: rotateY(-45deg);
  opacity: 0.3;
}
.card-enter-active {
  will-change: transform;
  transition: all 1s ease-in-out;
  transition-delay: $delay;
}
.card-enter-to,
.card-leave {
  filter: blur(0px) grayscale(70%);
  transform: rotateY(0deg);
  opacity: 1;
}

.interaction {
  transform: translateX($x);

  & > div {
    visibility: hidden;
    width: $circle;
    height: $circle;
    position: absolute;
    border-radius: 100%;
    opacity: 0.8;
    z-index: 0;
  }
}
@media screen and (min-width: 1000px) {
  .card__style {
    max-width: 43%;
  }
}

.hut {
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 0 0 $border_radius $border_radius;
  clip-path: polygon(50% 54%, 100% 70%, 100% 100%, 0% 100%, 0% 70%);
  animation: fadeInOut 6s linear alternate infinite;
  animation-delay: 4s;
}

@keyframes fadeInOut {
  0% {
    opacity: 1;
  }
  25% {
    opacity: 0.6;
  }
  50% {
    opacity: 0.4;
  }
  75% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
}
</style>

