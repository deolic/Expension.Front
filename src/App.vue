<template>
  <v-app>
    <v-app-bar app color="white" flat>
      <v-img src="./assets/logotest.png" height="66" width="66" contain />
      <v-tabs centered class="ml-n9" color="grey darken-1">
        <v-tab to="/"> Homepage </v-tab>
        <v-tab to="/manage-items" v-if="$store.state.admin"> Items </v-tab>
        <v-tab v-if="$store.state.logged" @click="signOut"> Logout </v-tab>
        <v-tab to="/login" v-if="!$store.state.logged">Log in</v-tab>
        <v-tab to="/register" v-if="!$store.state.logged">Register</v-tab>
      </v-tabs>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
    <v-divider></v-divider>
    <v-footer padless>
      <v-layout justify-center class="footer-text my-2">
        <template>2021 — <a href="https://github.com/deolic">deolic</a></template>
        <template> — </template>
        <router-link to="/terms" class="footer-link"><b>Terms of Use</b></router-link>
        <template> — </template>
        <router-link to="/policy" class="footer-link"><b>Privacy Policy</b></router-link>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    //
  }),

  methods: {
    signOut () {
      localStorage.clear()
      this.$store.commit('signOut')
      this.$router.push('/')
      location.reload()
    }
  }
}
</script>

<style scoped>
.footer-link {
  text-decoration: none;
  color: inherit;
}

.footer-text {
  white-space: pre;
  font-size: 0.875rem;
  line-height: 1.375rem;
  letter-spacing: 0.0071428571em;
  color: rgba(0, 0, 0, 0.6);
}
</style>
