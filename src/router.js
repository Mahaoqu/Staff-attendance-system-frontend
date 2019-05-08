import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/404',
      component: () => import('@/views/404'),
      hidden: true
    },
    {
      path: '/',
      name: 'dashbroad',
      component: () => import('./views/Dashbroad.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
    },
    {
      path: '*',
      redirect: '/404',
      hidden: true
    }
  ],
});
