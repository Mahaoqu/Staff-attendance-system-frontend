import Vue from 'vue';
import Vuex from 'vuex';

import {
  login,
  logout
} from '@/api/login'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    id: "",
    name: "",
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
    Login({
      commit
    }, form) {
      return new Promise((resolve, reject) => {
        login(form.id, form.password)
          .then(res => {
            sessionStorage.setItem('isLogin', true)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    GetInfo() {

    },
    LogOut({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          sessionStorage.removeItem('isLogin')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
  },
});

export default store;
