import Vue from "vue";
import Vuex from "vuex";

import {
  LOGIN,
  LOGOUT
} from "@/store/mutation-types";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    token: localStorage.getItem("token"),
    flag: localStorage.getItem("flag"),
    isloggedIn: localStorage.getItem("token") ? true : false,
    name: localStorage.getItem("name")
  },
  mutations: {
    [LOGIN](state, data) {
      state.token = localStorage.getItem("token");
      state.isloggedIn = state.token ? true : false;
      state.flag = localStorage.getItem("flag");
      state.name = localStorage.getItem("name");
    },

    [LOGOUT](state) {
      state.isloggedIn = false;
      state.token = null;
      state.flag = null;
      state.name = null;
    }
  },
  actions: {
    login({
      commit
    }, data) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("flag", data.flag);
      localStorage.setItem("name", data.name);

      commit(LOGIN, data);
    },
    logout({
      commit
    }) {
      localStorage.clear();
      commit(LOGOUT);
    }
  }
});
