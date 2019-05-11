import Vue from 'vue';
import Vuex from 'vuex';

import {
  login,
  logout
} from '@/api/login'

import {
  getRole
} from "@/api/userinfo";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    role : ""
  },
  mutations: {
    SET_ROLE: (state, role) => {
      state.role = role
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
    async GetRole({
      commit
    }) {
      const role = await getRole()
      commit('SET_ROLE', role.role)
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
