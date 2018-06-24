<template>
  <v-app>
    <transition-group name="page__rotate">
    <router-view key="router"></router-view>
    </transition-group>
</v-app>
</template>

<script>
export default {
  data() {
    return {};
  },
  name: "App"
};
</script>

<style lang="scss">
.page__rotate-enter-active {
  will-change: transform;
  transition: all 1.4s;
}
.page__rotate-enter {
  opacity: 0;
  transform: rotateX(180deg);
}
*::-webkit-scrollbar {
  width: 0.5em;
}

*::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

*::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 6px #0069ff;
}

.application {
  font-family: "Lora", serif !important;
}
.application--wrap,
.dialog > .card {
  background: linear-gradient(135deg, rgb(236, 143, 143), rgb(149, 149, 251));
}

label {
  font-family: "Lora", serif;
}

.list__tile__title {
  text-transform: capitalize;
  font: {
    size: 1.1rem;
  }
}

.btn--active .btn__content:before,
.btn:focus .btn__content:before,
.btn:hover .btn__content:before {
  background-color: transparent !important;
}
@media screen and (min-width: 1000px) {
  .container.grid-list-lg .layout .flex {
    padding: 12px;
  }
}

@media screen and (max-width: 560px) {
  .container {
    padding: 0;
    margin: 0;
  }
}

.dialog {
  border-radius: 10px !important;
  & .headline {
    background: #8081864d;
    margin-bottom: 25px;
    line-height: 0;
    font-family: "Berkshire Swash", cursive !important;
    text-shadow: 1px 1px 2px wheat;
    font-size: 2rem;
  }
}

//navbar global styles

.toolbar__content {
  flex-wrap: wrap !important;
  width: 90%;
  margin: 0 auto;
}

@media screen and (min-width: 700px) {
  .toolbar__title {
    margin-left: 4rem !important;
  }
  .society-name {
    margin-right: 5px !important;
  }
  .toolbar__content > .btn:last-child {
    margin-right: 2rem !important;
  }
}

@media screen and (max-width: 400px) {
  .toolbar__content {
    width: 100%;
  }
}

/* recommended css code for vue-svgicon */

.talkinglip path[pid="22"] {
  fill: rgb(166, 87, 80);
  opacity: 1;
  animation: talking 1.1s 5;
  animation-delay: 2s;
}

.talkinglip path[pid="23"] {
  animation: lipup 1.1s 5;
  animation-delay: 2s;
}

.talkinglip path[pid="21"] {
  animation: lipdown 1.1s 5;
  animation-delay: 2s;
}

@keyframes lipup {
  25% {
    transform: translateY(-2px);
  }
  50% {
    transform: translateY(-5px);
  }
  75% {
    transform: translateY(-2px);
  }
  100% {
    transform: translateY(0px);
  }
}

@keyframes lipdown {
  25% {
    transform: translateY(2px);
  }
  50% {
    transform: translateY(5px);
  }
  75% {
    transform: translateY(2px);
  }
  100% {
    transform: translateY(0px);
  }
}

@keyframes talking {
  25% {
    fill: white;
    opacity: 0.6;
  }
  50% {
    fill: white;
    opacity: 1;
  }
  75% {
    fill: white;
    opacity: 0.8;
  }
  90% {
    fill: white;
    opacity: 0.3;
  }
  100% {
    fill: rgb(166, 87, 80);
    opacity: 0.6;
  }
}

.svg-icon {
  display: inline-block;
  color: inherit;
  vertical-align: middle;
  fill: none;
  stroke: currentColor;
  width: 100%;
}

.svg-fill {
  fill: currentColor;
  stroke: none;
}
</style>


