<template>
  <transition name="header" appear>
   <v-flex sm12 class="header">
     <slot name="pageheader"></slot>
   </v-flex>
  </transition> 
</template>

<style lang="scss" scoped>
.header {
  font-size: 3.4rem;
  font-family: "Yatra One", cursive !important;
  color: #e0e0e0;
  text-shadow: -1px 1px 0 rgba(160, 160, 160, 0.1),
    1px -1px 0 rgba(255, 255, 255, 0.1), 1px -1px 25px white,
    -1px 1.2px 1px #a0a0a0, -2px 3.8px 2px #a0a0a0,
    -3px 3px 2px rgba(160, 160, 160, 0.6666666667),
    -4px 5px 2px rgba(160, 160, 160, 0.5), -5px 7px 3px rgba(160, 160, 160, 0.4),
    -6px 9px 4px rgba(160, 160, 160, 0.3333333333),
    -7px 11px 5px rgba(160, 160, 160, 0.2857142857);
}

.header-enter-active {
  transition: all 1s ease-in-out;
}
.header-enter {
  opacity: 0;
  transform: translateX(-50px);
}
.header-enter-to {
  opacity: 1;
  transform: translateX(0);
}

@media screen and (max-width: 400px) {
  .header {
    font-size: 2.5rem;
  }
}
</style>
