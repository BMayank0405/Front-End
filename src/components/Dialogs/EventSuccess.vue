<template>
  <!-- event created modal -->
  <v-card>
    <svg style="display: none;">
            <defs>
              <g id="Sparkle">
                <line x1="50" y1="50" x2="50" y2="95" />
                <line x1="50" y1="50" x2="50" y2="5" />
                <path d=" M 50 50 C 70.69 53.787 84.557 59.535 91.575 67.221" />
                <path d=" M 50 50 C 66.452 60.322 77.067 70.937 81.82 81.82" />
                <path d=" M 50 50 C 60.341 70.981 66.093 84.852 67.221 91.575" />
                <path d=" M 50 50 C 52.952 31.134 58.701 17.284 67.221 8.425" />
                <path d=" M 50 50 C 57.651 34.464 68.265 23.866 81.82 18.18" />
                <path d=" M 50 50 C 64.201 36.368 78.067 30.636 91.575 32.779" />
                <path d=" M 50 50 C 66.491 43.209 81.499 43.218 95 50" />
                <path d=" M 50 50 C 29.31 53.787 15.443 59.535 8.425 67.221" />
                <path d=" M 50 50 C 33.548 60.322 22.933 70.937 18.18 81.82" />
                <path d=" M 50 50 C 39.659 70.981 33.907 84.852 32.779 91.575" />
                <path d=" M 50 50 C 47.048 31.134 41.299 17.284 32.779 8.425" />
                <path d=" M 50 50 C 42.349 34.464 31.735 23.866 18.18 18.18" />
                <path d=" M 50 50 C 35.799 36.368 21.933 30.636 8.425 32.779" />
                <path d=" M 50 50 C 33.509 43.209 18.501 43.218 5 50" />
              </g>
            </defs>
          </svg>
    <svg id="svg1">
        <use class="s1 c1 d1" xlink:href="#Sparkle" transform="scale(2)" x="14%" y="6%" />
        <use class="s2 c2 d2" xlink:href="#Sparkle" transform="scale(1.8)" x="10%" y="10%" />
        <use class="s3 c3 d3" xlink:href="#Sparkle" transform="scale(1.6)" x="40%" y="15%" />
        <use class="s4 c1 d4" xlink:href="#Sparkle" transform="scale(1.4)" x="20%" y="25%" />
        <use class="s1 c2 d5" xlink:href="#Sparkle" transform="scale(2)" x="34%" y="22%" />
        <use class="s2 c3 d6" xlink:href="#Sparkle" transform="scale(1.8)" x="20%" y="14%" />
        <use class="s3 c4 d7" xlink:href="#Sparkle" transform="scale(1.9)" x="12%" y="21%" />
        <use class="s4 c4 d8" xlink:href="#Sparkle" transform="scale(1.5)" x="32%" y="15%" />
        <use class="s1 c4 d9" xlink:href="#Sparkle" transform="scale(2)" x="17%" y="16%" />
        <use class="s2 c5 d10" xlink:href="#Sparkle" transform="scale(1.8)" x="12%" y="4%" />
        <use class="s3 c6 d11" xlink:href="#Sparkle" transform="scale(1.6)" x="12%" y="5%" />
        <use class="s4 c5 d12" xlink:href="#Sparkle" transform="scale(1.4)" x="12%" y="15%" />
        <use class="s1 c6 d13" xlink:href="#Sparkle" transform="scale(2)" x="29%" y="28%" />
        <use class="s2 c4 d14" xlink:href="#Sparkle" transform="scale(1.8)" x="33%" y="13%" />
        <use class="s3 c3 d15" xlink:href="#Sparkle" transform="scale(1.9)" x="26%" y="22%" />
        <use class="s4 c2 d16" xlink:href="#Sparkle" transform="scale(1.7)" x="23%" y="24%" />
      </svg>
  
    <v-layout wrap justify-center class="EventSuccess">
      <v-flex class="center headline" mb-5>
        <v-card-title>
          {{head}}
          <v-avatar>
            <v-icon :medium="!small">
              {{icon}}
            </v-icon>
          </v-avatar>
        </v-card-title>
      </v-flex>
  
      <v-flex sm12 class="center">
        <svgicon class="loginmale" icon="malecartoonzipped" :original="true"></svgicon>
      </v-flex>
  
      <v-layout wrap justify-center pr-2 mt-5 mb-4>
        <v-flex sm12 class="center">
          <h2>{{SuccessMessage}}</h2>
        </v-flex>
      </v-layout>
  
      <v-spacer></v-spacer>
  
      <v-flex class="center" mt-4>
        <v-btn color="primary" round @click.native="close">
          Close
          <v-avatar>
            <v-icon>highlight_off</v-icon>
          </v-avatar>
        </v-btn>
      </v-flex>
    </v-layout>
  
  
  </v-card>
</template>


<script>
import "../../assets/compiled-icons/malecartoonzipped";
export default {
  data() {
    return {
      small: window.innerWidth < 400
    };
  },
  props: {
    SuccessMessage: {
      type: String,
      required: true
    },
    head: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    }
  }
};
</script>



<style lang="scss" scoped>
#svg1 {
  width: 100%;
  margin: 0 auto;
  min-height: 50vh;
}

#Sparkle > * {
  stroke-width: 3;
  stroke: inherit;
  stroke-linejoin: round;
  stroke-linecap: round;
  stroke-miterlimit: 3;
  stroke-dashoffset: inherit;
  stroke-dasharray: 10, 150;
  fill: none;
  vector-effect: non-scaling-stroke;
  transform: inherit;
}

use.s1 {
  animation: anim1 9.2s infinite;
}

use.s2 {
  animation: anim1 7.6s infinite;
}

use.s3 {
  animation: anim1 8.7s infinite;
}

use.s4 {
  animation: anim1 11s infinite;
}

use.c1 {
  stroke: #11d7cd;
}

use.c2 {
  stroke: #fde91c;
}

use.c3 {
  stroke: #02c2ef;
}

use.c4 {
  stroke: #dbe5d6;
}

use.c5 {
  stroke: #22eebd;
}

use.c6 {
  stroke: #f33d3b;
}

use.d1 {
  animation-delay: 0;
}

use.d2 {
  animation-delay: -0.5s;
}

use.d3 {
  animation-delay: -1.1s;
}

use.d4 {
  animation-delay: -2.3s;
}

use.d5 {
  animation-delay: -3s;
}

use.d6 {
  animation-delay: -3.5s;
}

use.d7 {
  animation-delay: -4s;
}

use.d8 {
  animation-delay: -5.8s;
}

use.d9 {
  animation-delay: -6.5s;
}

use.d10 {
  animation-delay: -7.2s;
}

use.d11 {
  animation-delay: -7.8s;
}

use.d12 {
  animation-delay: -8s;
}

use.d13 {
  animation-delay: -8.9s;
}

use.d14 {
  animation-delay: -9.2s;
}

use.d15 {
  animation-delay: -9.5s;
}

use.d16 {
  animation-delay: -5s;
}

.EventSuccess {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 100%;
  width: 100%;
  opacity: 0.8;
}

@keyframes anim1 {
  0% {
    stroke-dashoffset: 150;
  }
  20% {
    stroke-dashoffset: 30;
  }
  100% {
    stroke-dashoffset: 30;
  }
}

.center {
  display: flex;
  justify-content: center;
  width: 100%;
  & h1 {
    line-height: 0;
    font-family: "Berkshire Swash", cursive !important;
  }
  & h2 {
    font: {
      size: 1.6rem;
      family: "Yatra One", cursive !important;
    }
    text-align: center;
  }
}

.svg-icon {
  display: inline-block;
  color: inherit;
  vertical-align: middle;
  fill: none;
  stroke: currentColor;
  width: 36%;
}

.svg-fill {
  fill: currentColor;
  stroke: none;
}
</style>
