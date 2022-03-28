import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入路由中需要使用的组件功能
// import Login from '@/views/login/index'
// import Layout from '@/views/layout/index'
// import Home from '@/views/home/index'
// import Role from '@/views/role/index'
// import Menu from '@/views/menu/index'
// import Resource from '@/views/resource/index'
// import Course from '@/views/course/index'
// import User from '@/views/user/index'
// import Advert from '@/views/advert/index'
// import AdvertSpace from '@/views/advert-space/index'
// import ErrorPage from '@/views/error-page/index'
Vue.use(VueRouter)
// 路由规则
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index')
  },
  {
    path: '/',
    component: () => import('@/views/layout/index'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home/index')
      },
      {
        path: '/role',
        name: 'role',
        component: () => import('@/views/role/index')
      },
      {
        path: '/menu',
        name: 'menu',
        component: () => import('@/views/menu/index')
      },
      {
        path: '/resource',
        name: 'resource',
        component: () => import('@/views/resource/index')
      },
      {
        path: '/course',
        name: 'course',
        component: () => import('@/views/course/index')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('@/views/user/index')
      },
      {
        path: '/advert',
        name: 'advert',
        component: () => import('@/views/advert/index')
      },
      {
        path: '/advert-space',
        name: 'advert-space',
        component: () => import('@/views/advert-space/index')
      }
    ]
  },
  {
    path: '*',
    name: 'error-page',
    component: import('@/views/error-page/index')
  }
]

const router = new VueRouter({
  routes
})

export default router
