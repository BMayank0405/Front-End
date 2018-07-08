<template>
  <v-card>
    <v-flex class="center headline" mb-5>
      <v-card-title>
        {{header}}
        <v-avatar>
          <v-icon :medium="!small">
            {{icon}}
          </v-icon>
        </v-avatar>
      </v-card-title>
    </v-flex>
    <v-layout wrap justify-center pr-2 mt-5 mb-4>
      <v-flex sm12 class="center">
        <h2>{{message}}</h2>
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
  
  </v-card>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true
    },
    header: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      default: "add_alert"
    }
  },
  data() {
    return {
      small: window.innerWidth < 400
    };
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
  font-family: "Yatra One", cursive !important;
  text-shadow: 1px 1px 2px wheat;
}

button {
  margin: {
    top: 10px;
    bottom: 20px;
  }
  padding-left: 10px;
}
</style>
