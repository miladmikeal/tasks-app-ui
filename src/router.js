import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import Dashboard from './views/Dashboard.vue'
import Profile from './views/Profile.vue'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      beforeEnter(to, from, next) {
        if (store.state.token) {
          next()
        } else {
          next('/')
        }
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      beforeEnter(to, from, next) {
        if (store.state.token) {
          next()
        } else {
          next('/')
        }
      }
    }
  ]
})
