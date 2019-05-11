import Vue from 'vue';
import Vuex from 'vuex';

import {
  login,
  logout
} from '@/api/login'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user_info: {
      id: "",
      name: "",
      role: "",
    }
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
    async Login({
      commit
    }, form) {
      const loginData = await login(form.id, form.password)
      sessionStorage.setItem('isLogin', true)
      return loginData
    },
    GetInfo() {

    },
    async LogOut({
      commit,
      state
    }) {
      const logoutData = await logout(state.token)
      sessionStorage.removeItem('isLogin')
      return logoutData
    }
  },
});

export default store;
