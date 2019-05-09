import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store'

Vue.use(Router);

const router = new Router({
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

const whiteList = ['/login'] // 不重定向白名单

router.beforeEach((to, from, next) => {
  if (sessionStorage.getItem('isLogin')) {
    if (to.path === '/login') {
      next({
        path: '/'
      })
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 如果存在于白名单中，继续
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
    }
  }
})

export default router;
