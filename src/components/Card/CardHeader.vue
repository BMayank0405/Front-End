<template>
  <v-card-title primary-title class="pb-0">
    <div class="mx-auto">
      <div>Team &nbsp;<h2>{{name}}</h2>&nbsp; Presents</div>
    </div>
  </v-card-title>
</template>


<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
div.mx-auto {
  text-transform: capitalize;
  & > div {
    font: {
      size: 1.7rem;
    }
    display: inline-flex;
    & > h2 {
      font: {
        family: "Berkshire Swash", cursive !important;
        size: 1.8rem;
      }
    }
  }
}

@media screen and (max-width: 500px) {
  div.mx-auto > div {
    text-align-last: center;
    text-align: justify;
    font-size: 1.28rem;
    & > h2 {
      font-size: 1.43rem;
    }
  }
}
</style>

