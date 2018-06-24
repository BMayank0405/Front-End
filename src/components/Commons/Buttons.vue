<template>
  <v-flex sm12>
    <v-container grid-list-lg>
  
      <!-- create event -->
      <v-layout row wrap align-center>
  
        <v-flex xs12 v-for="(btn,index) in btns" :key="index">
          <v-btn round :to="btn.to" :large="!small" color="primary">
            {{btn.name}}
            <v-avatar>
              <v-icon :medium="!small">{{btn.icon}}</v-icon>
            </v-avatar>
          </v-btn>
        </v-flex>
  
      </v-layout>
  
    </v-container>
  </v-flex>
</template>

<script>
export default {
  props: {
    btns: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      small: window.innerWidth < 400
    };
  }
};
</script>


<style lang="scss" scoped>
.container {
  padding: 25px !important;
  width: 80%;
  border-radius: 10px;
  background-color: #e6e5e561;
}

.flex {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 8px !important;
  &:first-of-type {
    margin-top: 20px;
  }
  &:last-of-type {
    margin-bottom: 20px;
  }
}

.btn {
  font-size: 1.3rem;
}

@media screen and (max-width: 560px) {
  .btn {
    font-size: 1rem;
  }
}
</style>
