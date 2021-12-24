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
    },
    adminPermissions (state) {
      state.admin = true
    }
  },
  actions: {
  },
  modules: {
  }
})
