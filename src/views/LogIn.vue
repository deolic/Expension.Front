<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-container v-on:keyup.enter="signIn">
      <v-text-field
        v-model="email"
        :rules="[v => !!v || 'Please enter your email!']"
        label="E-mail"
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        :rules="[v => !!v || 'Please enter your password!']"
        label="Password"
        type="password"
        required
      ></v-text-field>

      <v-row class="mt-5">
        <v-btn
          :disabled="!valid"
          class="mr-4"
          @click="signIn"
        >
          Sign in
        </v-btn>

        <v-btn
          class="mr-4"
          @click="clearForm"
        >
            Reset
        </v-btn>
        <div v-if="error" class="ml-4 red--text">
          {{ responseMessage }}
        </div>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import axios from 'axios'

export default {
  name: 'LogIn',

  data: () => ({
    error: false,
    valid: true,
    email: '',
    password: '',
    responseMessage: null,
    responseData: null
  }),

  methods: {
    signIn () {
      if (this.$refs.form.validate()) {
        axios
          .post('api/users/login', {
            Email: this.email,
            Password: this.password
          })
          .then(response => {
            this.responseData = response.data
            if (this.responseData !== undefined) {
              localStorage.setItem('userId', this.responseData.userId.toString())
              localStorage.setItem('email', this.responseData.email)
              localStorage.setItem('isAdmin', this.responseData.isAdmin.toString())
              localStorage.setItem('token', this.responseData.token.toString())
              this.error = false
              this.$router.push('/')
              location.reload()
            }
          })
          .catch(error => {
            if (error.response !== undefined) {
              this.responseMessage = error.response.data.message
              this.error = true
            }
          })
      }
    },
    clearForm () {
      this.responseMessage = null
      this.error = false
      this.$refs.form.reset()
    }
  }
}
</script>
