<template>
  <v-card>
    <v-flex class="center">
      <v-card-title class="headline">Suggest an edit for the Event</v-card-title>
    </v-flex>
      <v-layout wrap justify-center  pr-2>
        <v-flex xs12>
          <v-text-field label="Suggest an edit for the Event" v-model.lazy="edit" counter="40" multi-line prepend-icon="create" :error-messages="editErrors" required @blur="delayTouch($v.edit,200)" @input="delayTouch($v.edit,1000)">
          </v-text-field>
        </v-flex>
      </v-layout>
    <v-card-actions>
      <v-flex class="center">
        <v-btn color="primary" :disabled="error" round @click.native="editevent()">
          Suggest
          <v-avatar>
            <v-icon>record_voice_over</v-icon>
          </v-avatar>
        </v-btn>
      </v-flex>
  
    </v-card-actions>
  </v-card>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength, maxLength } from "vuelidate/lib/validators";

const touchMap = new WeakMap();

export default {
  data() {
    return {
      edit: "",
      error: true
    };
  },
  mixins: [validationMixin],
  computed: {
    editErrors() {
      const errors = [];
      if (!this.$v.edit.$dirty) return errors;
      !this.$v.edit.required && errors.push("edit is required.");
      !this.$v.edit.minLength &&
        errors.push("edit should be more than 5 characters long");
      !this.$v.edit.maxLength &&
        errors.push("edit must be at most 40 characters long");
      if (errors.length > 0) this.error = true;
      else this.error = false;
      return errors;
    }
  },
  validations: {
    edit: {
      required,
      minLength: minLength(5),
      maxLength: maxLength(40)
    }
  },
  methods: {
    editevent: async function() {
      this.$emit("clicked", this.edit);
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
.center {
  display: flex;
  justify-content: center;
}
button {
  margin: {
    top: 10px;
    bottom: 20px;
  }
}
.headline {
  font: {
    size: 2rem;
    family: "Berkshire Swash", cursive !important;
  }
}
</style>
