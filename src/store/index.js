import jsonwebtoken from 'jsonwebtoken'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    logged: false,
    admin: false
  },
  mutations: {
    signIn (state) {
      state.logged = true
    },
    signOut (state) {
      state.logged = false
      state.admin = false
      state.token = null
      state.test = null
      localStorage.clear()
    },
    adminPermissions (state) {
      state.admin = true
    },
    checkToken (state) {
      var token = localStorage.getItem('token')
      if (token != null) {
        try {
          var temp = jsonwebtoken.verify(token, 'String used to generate a security key', { ignoreNotBefore: true })
          if (temp != null) {
            state.logged = true
            if (temp.role === 'admin') {
              state.admin = true
            }
          }
        } catch (err) {
          state.logged = false
          state.admin = false
        }
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
