<template>
  <v-card>
    <v-form autocomplete="off">
      <v-flex class="center headline">
        <v-card-title>Update your password</v-card-title>
      </v-flex>
      <v-layout row justify-center pr-2>
        <v-flex class="hidden-sm-and-down" md4>
          <v-subheader class="fields">New Password</v-subheader>
        </v-flex>
        <v-flex xs12 m8>
          <v-text-field name="password" label="Enter your new password" hint="At least 6 characters" v-model.lazy="newPassword" min="6" prepend-icon="vpn_key" :append-icon="visibility_icon ? 'visibility' : 'visibility_off'" @click:append="visibility_icon = !visibility_icon"
            :type="visibility_icon ? 'text': 'password'" required :error-messages="newPasswordErrors" @blur="delayTouch($v.newPassword,100)" @input="delayTouch($v.newPassword,100)" autocomplete></v-text-field>
        </v-flex>
      </v-layout>
  
      <v-spacer></v-spacer>
      <v-flex class="center">
        <v-btn color="primary darken-1" :disabled="error" round @click.native="update()">
          Update Password
          <v-avatar>
            <v-icon>enhanced_encryption</v-icon>
          </v-avatar>
        </v-btn>
      </v-flex>
    </v-form>
  </v-card>
</template>


<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
const touchMap = new WeakMap();
export default {
  data() {
    return {
      newPassword: "",
      visibility_icon: false,
      error: true
    };
  },
  mixins: [validationMixin],
  computed: {
    newPasswordErrors() {
      const errors = [];
      if (!this.$v.newPassword.$dirty) return errors;
      !this.$v.newPassword.required && errors.push("Password is required.");
      !this.$v.newPassword.minLength &&
        errors.push("Password should be more than 6 characters long");
      if (errors.length > 0) this.error = true;
      else this.error = false;
      return errors;
    }
  },
  validations: {
    newPassword: {
      required,
      minLength: minLength(6)
    }
  },
  methods: {
    update: async function() {
      this.$emit("clicked", this.newPassword);
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
}

button {
  margin: {
    top: 10px;
    bottom: 20px;
  }
  padding-left: 10px;
}
</style>
