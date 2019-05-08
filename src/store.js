import Vue from 'vue';
import Vuex from 'vuex';

import {login} from '@/api/login'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    id: "",
    name: ""
  },
  mutations: {
    SET_ID: (state, id) => {
      state.id = id
    },
    SET_NAME: (state, name) => {
      state.name = name
    }
  },
  actions: {
    Login({ commit }, form) {
      return new Promise((resolve, reject) => {
        login(form.id, form.password)
          .then(res => {
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    GetInfo() {

    },
    LogOut() {

    }
  },
});
