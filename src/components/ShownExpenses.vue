<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col class="mb-4" v-if="!$store.state.logged">
        <h1 class="display-2 font-weight-bold mb-3">Welcome to Expension</h1>
        <p>
          Only logged users can use the app.
          <router-link to="/login"><b>Log in</b></router-link> or
          <router-link to="/register">create a new account</router-link>.
        </p>
      </v-col>
    </v-row>
    <div v-if="$store.state.logged">
      <v-row justify="center" class="mt-5 mb-1">
        <v-btn @click="addExpense">
          EXPENSE <v-icon>mdi-plus-circle</v-icon>
        </v-btn>
      </v-row>
      <v-container
        v-for="expense in expenses"
        :key="expense.expenseId"
        class="grey lighten-5 mb-6"
      >
        <v-row no-gutters justify="center">
          <v-col lg="6">
            <v-card
              class="pa-2"
              outlined
              tile
            >
              <AddedExpense v-bind:expense="expense" @deleteExpense="loadExpenses" />
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-container>
</template>

<script>
import axios from 'axios'
import store from '../store'

import AddedExpense from './AddedExpense.vue'

export default {
  name: 'ShownExpenses',
  store,

  data: () => ({
    error: false,
    loading: false,
    responseReceived: false,
    responseMessage: null,
    expenses: null
  }),

  components: {
    AddedExpense
  },

  beforeMount () {
    this.loadExpenses()
  },

  methods: {
    signOut () {
      localStorage.clear()
      this.$store.commit('signOut')
      this.$router.push('/')
      location.reload()
    },
    addExpense () {
      axios
        .post(
          'api/expenses',
          {
            Date: new Date().toJSON()
          },
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }
          }
        )
        .then((response) => {
          this.responseReceived = true
          this.responseMessage = 'Expense has been added'
          this.error = false
        })
        .catch((error) => {
          this.responseReceived = true
          this.responseMessage = error.response.data.message
          this.error = true
        })
        .finally(() => {
          this.loadExpenses()
        })
    },
    loadExpenses () {
      if (this.loading) return

      this.loading = true

      axios
        .get('api/expenses/user', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        })
        .then((response) => {
          this.expenses = response.data
        })
        .catch((error) => {
          console.log(error)
          this.error = true
        })
        .finally(() => {
          this.loading = false
        })
    }
  },

  mounted () {
    if (localStorage.getItem('userId') !== null) {
      this.$store.commit('signIn')
      if (localStorage.getItem('isAdmin') === 'true') {
        this.$store.commit('adminPermissions')
      }
    }
  }
}
</script>

<style>
a {
  text-decoration: none;
  font-weight: bold;
}
</style>
