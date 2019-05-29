import Vue from 'vue';
import Vuex from 'vuex';

import {
  login,
  logout
} from '@/api/auth'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {

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
      sessionStorage.setItem('ID', form.id)
      sessionStorage.setItem('role', loginData.role)
      return loginData
    },
    async LogOut({
      commit,
      state
    }) {
      const logoutData = await logout(state.token)
      sessionStorage.removeItem('isLogin')
      sessionStorage.removeItem('ID')
      sessionStorage.removeItem('role')
      return logoutData
    }
  },
});

export default store;
