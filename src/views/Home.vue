<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col md="4" v-if="!$store.state.logged">
        <h1 class="display-2 font-weight-bold mb-3">Welcome to Expension</h1>
        <p>
          Only logged users can use the app.
          <router-link to="/login"><b>Log in</b></router-link> or
          <router-link to="/register">create a new account</router-link>.
        </p>
      </v-col>
    </v-row>
    <shown-expenses />
  </v-container>
</template>

<script>
import store from '../store'

import ShownExpenses from '../components/ShownExpenses'

export default {
  name: 'Home',
  store,

  components: {
    ShownExpenses
  }
}
</script>
