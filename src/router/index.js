import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ManageItems from '../views/ManageItems.vue'
import Register from '../views/Register.vue'
import LogIn from '../views/LogIn.vue'
import TermsOfAgreement from '../views/TermsOfAgreement.vue'
import PrivacyPolicy from '../views/PrivacyPolicy.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/manage-items',
    name: 'ManageItems',
    component: ManageItems
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'LogIn',
    component: LogIn
  },
  {
    path: '/terms',
    name: 'TermsOfAgreement',
    component: TermsOfAgreement
  },
  {
    path: '/policy',
    name: 'PrivacyPolicy',
    component: PrivacyPolicy
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
