import Vue from 'vue'
import App from './App'
import router from './router'
import VueSVGIcon from "vue-svgicon";
import {
  Vuetify,
  VApp,
  VIcon,
  VGrid,
  VToolbar,
  VSubheader,
  VSelect,
  VTextField,
  VBtn,
  VCard,
  VAvatar,
  VDatePicker,
  VTimePicker,
  VForm,
  VMenu,
  VCheckbox,
  VDialog
} from 'vuetify'
import '../node_modules/vuetify/src/stylus/app.styl'
import {
  Ripple
} from 'vuetify/es5/directives'
import {
  sync
} from "vuex-router-sync";
import VueWorker from 'vue-worker'
import store from "@/store/store";
Vue.use(Vuetify, {
  components: {
    Vuetify,
    VApp,
    VIcon,
    VGrid,
    VToolbar,
    VSubheader,
    VSelect,
    VTextField,
    VBtn,
    VCard,
    VAvatar,
    VDatePicker,
    VTimePicker,
    VForm,
    VMenu,
    VCheckbox,
    VDialog
  },
  directives: {
    Ripple
  }
})
Vue.use(VueSVGIcon);
Vue.use(VueWorker)
Vue.config.productionTip = false
sync(store, router);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
