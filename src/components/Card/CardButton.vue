<template>
   <v-card-actions class="mb-2 mt-2">
      <v-btn round :large="!small && animation" @click.stop="clicked(returnParam)" class="mx-auto transparent" :class="{btn__animation:animation,}">{{buttonName}}
         <v-avatar>
            <v-icon :medium="!small">{{icon}}</v-icon>
         </v-avatar>
      </v-btn>
   </v-card-actions>
</template>

<script>
export default {
  props: {
    buttonName: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    returnParam: {
      type: String,
      required: true
    },
    animation: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      small: window.innerWidth < 400
    };
  },
  methods: {
    clicked: function(returnParam) {
      this.$emit("clicked", returnParam);
    }
  }
};
</script>

<style lang="scss" scoped>
button {
  font-weight: bold;
}
.mx-auto {
  font-size: 1rem;
  z-index: 4;
}

.btn__animation {
  animation: btn_move 1s infinite alternate ease-in-out;
  font-size: 1.3rem;
}
@keyframes btn_move {
  from {
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
      0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
  }
  to {
    box-shadow: 4px 4px 3px -2px rgba(0, 0, 0, 0.2),
      1px 3px 2px 0 rgba(0, 0, 0, 0.14), 2px 2px 4px 0 rgba(0, 0, 0, 0.12);
  }
}

@media screen and (max-width: 400px) {
  .mx-auto {
    font-size: 1rem;
  }
}
</style>

