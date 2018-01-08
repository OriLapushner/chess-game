import Vue from 'vue'
import Router from 'vue-router'

import HomePage from '../pages/HomePage'
import MovesPage from '../pages/MovesPage'
import RulesPage from '../pages/RulesPage'
import SignupPage from '../pages/SignupPage'
import LoginPage from '../pages/LoginPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/rules',
      name: '/RulesPage',
      component: RulesPage
    },
    {
      path: '/signup',
      name: 'SignupPage',
      component: SignupPage
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/moves',
      name: 'MovesPage',
      component: MovesPage
    },
  ]
})
