<template>
  <v-card>
    <v-flex class="center headline">
      <v-card-title>Forgot your password
        <v-avatar>
          <v-icon :medium="!small">contact_support</v-icon>
        </v-avatar>
      </v-card-title>
    </v-flex>
    <v-form>
      <v-layout row justify-center pr-2>
        <v-flex class="hidden-sm-and-down" md3>
          <v-subheader class="fields">Username</v-subheader>
        </v-flex>
        <v-flex xs12 md9>
          <v-text-field name="username" label="Enter the Username" :error-messages="UsernameErrors" prepend-icon="account_circle" v-model.lazy="Username" required @blur="delayTouch($v.Username,200)" @input="delayTouch($v.Username,200)">
          </v-text-field>
        </v-flex>
      </v-layout>
      <v-spacer></v-spacer>
      <v-flex class="center">
        <v-btn color="primary" :disabled="error" round @click.native="getPass()">
          Get Password
          <v-avatar>
            <v-icon>lock_open</v-icon>
          </v-avatar>
        </v-btn>
      </v-flex>
    </v-form>
  </v-card>
</template>



<script>
import { validationMixin } from "vuelidate";
import {
  required,
  minLength,
  maxLength,
  alphaNum
} from "vuelidate/lib/validators";

const touchMap = new WeakMap();
export default {
  data() {
    return {
      Username: "",
      error: true,
      small: window.innerWidth < 400
    };
  },
  mixins: [validationMixin],
  computed: {
    UsernameErrors() {
      const errors = [];
      if (!this.$v.Username.$dirty) return errors;
      !this.$v.Username.required && errors.push("Username is required.");
      !this.$v.Username.minLength &&
        errors.push("Username should be more than 5 characters long");
      !this.$v.Username.maxLength &&
        errors.push("Username must be at most 30 characters long");
      !this.$v.Username.alphaNum &&
        errors.push("Username should only contain alphanumeric characters");
      if (errors.length > 0) this.error = true;
      else this.error = false;
      return errors;
    }
  },
  validations: {
    Username: {
      required,
      alphaNum,
      minLength: minLength(5),
      maxLength: maxLength(30)
    }
  },
  methods: {
    getPass: async function() {
      this.$emit("clicked", this.Username);
    },
    delayTouch: function($v, time) {
      $v.$reset();
      if (touchMap.has($v)) clearTimeout(touchMap.get($v));
      touchMap.set($v, setTimeout($v.$touch, time));
    }
  }
};
</script>


<style lang="scss" scoped>
.fields {
  font-size: 15px;
  color: black;
  transform: translateY(6px);
}
.center {
  display: flex;
  justify-content: center;
  width: 100%;
  flex-wrap: wrap;
}
button {
  margin: {
    top: 10px;
    bottom: 20px;
  }
  padding-left: 10px;
}
</style>
