<template>
  <v-container class="primary maincontainer">
    <v-layout justify-center>
      <h1>
        <div v-for="(word,index) in fieldHeader" :key="index">
        <transition @enter="enter" :css="false" appear>
          <div class="form__Header" style="white-space:pre">{{word}}</div>
        </transition>
        </div>
      </h1>
    </v-layout>
    <transition name="formfield__transition" appear>
      <slot name="fieldInput"></slot>
    </transition>
    <v-layout justify-center>
      <v-flex xs4>
        <v-btn round :large="!small" :disabled="this.errors.includes(true)" color="primary" @click.stop="requiredAction">
          {{fieldButton}}
          <v-avatar>
            <v-icon :medium="!small">{{btnIcon}}</v-icon>
         </v-avatar>
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
export default {
  data() {
    return {
      small: window.innerWidth < 400,
      delay: 0
    };
  },
  methods: {
    requiredAction: function() {
      this.$emit("requiredAction");
    },
    enter: function(el, done) {
      let animation = [
        {
          opacity: 0,
          transform: "rotateY(180deg)",
          filter: "blur(3px)"
        },
        {
          opacity: 1,
          transform: "rotateY(10deg)",
          filter: "blur(1.5px)",
          offset: 0.7
        },
        {
          opacity: 1,
          transform: "rotateY(0deg)",
          filter: "drop-shadow(1px 0px 2px white)"
        }
      ];
      let animation_prop = {
        duration: 700,
        delay: this.delay,
        fill: "forwards"
      };
      el.animate(animation, animation_prop);
      this.delay += 700;
      done();
    }
  },
  computed: {},
  props: {
    fieldHeader: {
      type: Array,
      required: true
    },
    fieldButton: {
      type: String,
      required: true
    },
    btnIcon: {
      type: String,
      required: true
    },
    errors :{
      type:Array
    }
  }
};
</script>


<style lang="scss" scoped>
$delay: 1.4s;
$x: 60px;

.maincontainer {
  width: 55%;
  border-radius: 10px;
  margin-top: 15px;
}

.layout:last-of-type {
  transform: translateX($x);
  margin-top: 20px;
}

h1 {
  color: white;
  opacity: 1;
  text-shadow: 2px 0px 6px black;
  font: {
    size: 3.4rem;
  }
  & > div {
    margin-right: 1px;
    display: inline-block;
    & > div {
      display: inline-block;
      opacity: 0;
    }
  }
}

.formfield__transition-enter-active,
.heading-enter-active {
  transition: all 1s;
  transition-delay: $delay;
}

.formfield__transition-enter {
  opacity: 0;
  transform: translateX($x + 40px);
}

button {
  font-weight: bold;
  font-size: 1.3rem;
  z-index: 4;
}

@media screen and (min-width: 561px) and (max-width: 800px) {
  .maincontainer {
    width: 80%;
  }
  .layout:last-of-type {
    transform: translateX(-20px);
  }
}

@media screen and (max-width: 560px) {
  .maincontainer {
    width: 85%;
    margin-left: 1rem;
  }
  .layout:last-of-type {
    transform: translateX(-30px);
  }
  button {
    font-size: 1rem;
  }
  h1 {
    margin-top: 10px;
    font-size: 1.5rem;
  }
}
</style>