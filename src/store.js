import Vue from 'vue';
import Vuex from 'vuex';

import {
  login,
  logout
} from '@/api/login'

import {
  getUserInfo
} from "@/api/userinfo";
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
    SET_USER_INFO: (state, info) => {
      state.user_info = info
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
    async GetInfo({
      commit
    }) {
      const info = await getUserInfo()
      commit('SET_USER_INFO', info)
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
