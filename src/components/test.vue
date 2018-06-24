<template>
  <v-app>
    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs12 sm6>
          <v-subheader v-text="'Autocomplete'"></v-subheader>
        </v-flex>
        <v-flex xs12 sm6>
          <v-select  :items="states" v-model="a1" item-text="name" label="Select" autocomplete></v-select>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>


<script>
export default {
  data() {
    return {
      a1: "",
      states: [
        {
          name: "Florida",
          id: 1
        },
        {
          name: "Georgia",
          id: 2
        },
        {
          name: "Nebraska",
          id: 3
        },
        {
          name: "California",
          id: 4
        },
        {
          name: "New York",
          id: 5
        }
      ]
    };
  }
};
</script>
