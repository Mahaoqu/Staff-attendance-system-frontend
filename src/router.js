import Vue from 'vue';
import Router from 'vue-router';
import Dashbroad from './views/Dashbroad.vue';
import Login from './views/Login.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'dashbroad',
      component: Dashbroad,
    },
    {
      path: '/login',
      name: 'home',
      component: Login,
    },
    {
      path: '*',
      name: '404',
      component: Home,
    },
  ],
});
