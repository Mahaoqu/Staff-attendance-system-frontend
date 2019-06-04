import Vue from 'vue';
import Router from 'vue-router';

import {
  getCurrentRole
} from '@/utils/storage'

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
      component: () => import('@/views/Dashbroad'),
      children: [{
          path: "",
          component: () => import('@/views/Default')
        },
        {
          path: 'profile',
          component: () => import('@/views/Profile')
        },
        {
          path: 'staffs',
          component: () => import('@/views/Manager/Staffs'),
          meta: {
            role: ['manager']
          }
        },
        {
          path: 'leave',
          component: () => import('@/views/Staff/Leaves')
        },
        {
          path: 'overwork',
          component: () => import('@/views/Staff/Overwork')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login'),
    },
    {
      path: '*',
      redirect: '/404',
      hidden: true
    }
  ],
});

const whiteList = ['/login'] // 不重定向白名单

router.beforeEach(async (to, from, next) => {

  // 先判断是否已经登录
  if (sessionStorage.getItem('isLogin')) {

    // 如果前往登录页则转移到主页
    if (to.path === '/login') {
      next({
        path: '/'
      })

      // 404重定向，刷新后可以直接转到所在页面
    } else if (to.path === '/404') {
      const toPath = to.query.redirect;
      if (toPath === undefined) {
        next()
      } else {
        next({
          path: toPath
        })
      }
      // 权限检查，在路由表的meta成员的role属性中
    } else if (to.meta.role === undefined || to.meta.role.indexOf(getCurrentRole()) !== -1) {
      next()

      // 没有找到的页面定位到404页
    } else {
      next({
        path: `404?redirect=${to.path}`
      })
    }

    // 如果存在于白名单中，继续
  } else if (whiteList.indexOf(to.path) !== -1) {
    next()

    // 否则全部重定向到登录页
  } else {
    next(`/login?redirect=${to.path}`)
  }
})

export default router;
