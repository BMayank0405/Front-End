<template>
  <section>
    <transition-group name="svganim" appear>
      <v-layout justify-center key="svg">
        <v-flex sm12 class="center">
          <svgicon class="talkinglip" icon="malecartoonzipped" :original="true"></svgicon>
        </v-flex>
      </v-layout>
  
      <div key="text">
        <h3>How can I help you ?</h3>
      </div>
    </transition-group>
  </section>
</template>

<script>
import "../../assets/compiled-icons/malecartoonzipped";
export default {};
</script>

<style lang="scss" scoped>
section {
  width: 100%;
}

div {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  & > h3 {
    font-family: "Berkshire Swash", cursive !important;
    font-size: 2.3rem;
    margin: 10px;
    border-right: 1px solid black;
    width: 0ch;
    white-space: nowrap;
    overflow: hidden;
    animation: typing 5s steps(22, end), blink-caret 1s infinite;
    animation-delay: 2s;
    animation-fill-mode: forwards;
  }
}

@media screen and (max-width: 400px) {
  div > h3 {
    font-size: 1.5rem;
  }
}

@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 16.5ch;
  }
}

.center {
  max-width: 25%;
  margin-bottom: 20px;
}
@keyframes blink-caret {
  50% {
    border-color: transparent;
  }
}

.svganim-enter-active {
  transition: all 1s 800ms ease-in-out;
}

.svganim-enter {
  opacity: 0;
  transform: translateX(50px);
}

.svganim-enter-to {
  opacity: 1;
  transform: translateX(0);
}
</style>
