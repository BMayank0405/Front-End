<template>
  <v-card>
    <v-flex class="center headline">
      <v-card-title>Congrats !</v-card-title>
    </v-flex>

    <v-layout wrap justify-center>
      <v-flex sm12 class="center">
        <v-card-text>
          <h2>{{message}}</h2>
        </v-card-text>
      </v-flex>
  
  
      <v-card-actions>
        <v-btn color="primary" round @click="close">
          Close
        </v-btn>
      </v-card-actions>
  
    </v-layout>
  
  
  </v-card>
</template>


<script>
import "../../assets/compiled-icons/malecartoonzipped";
export default {
  props: {
    message: {
      type: String,
      required: true
    }
  },
  methods: {
    close: function() {
      this.$emit("clicked");
    }
  }
};
</script>



<style lang="scss" scoped>
.center {
  display: flex;
  justify-content: center;
  width: 100%;
  flex-wrap: wrap;
}

h2 {
  text-align: center;
}

button {
  margin: {
    top: 10px;
    bottom: 20px;
  }
  padding-left: 10px;
}
</style>
