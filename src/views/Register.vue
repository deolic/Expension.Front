<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-container v-on:keyup.enter="signIn">
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        :rules="passwordRules"
        label="Password"
        type="password"
        required
      ></v-text-field>

      <v-text-field
        v-model="confirmPassword"
        :rules="[v => (v && v === this.password)|| 'Passwords don\'t match!']"
        label="Confirm password"
        type="password"
        required
      ></v-text-field>

      <v-checkbox
        v-model="checkbox"
        :rules="[v => !!v || 'You must agree to continue!']"
        required
      >
        <template v-slot:label>
          <div>
            I agree with
            <router-link to="/terms"><b>terms of use</b></router-link>
            and
            <router-link to="/policy"><b>privacy policy</b></router-link>.
          </div>
        </template>
      </v-checkbox>

      <v-row class="mt-5">
        <v-btn
          :disabled="!valid"
          class="mr-4"
          @click="register"
        >
          Register
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
        <div v-else-if="responseReceived" class="ml-4">
          {{ responseMessage }} You can <router-link to="/login"><b>sign in</b></router-link> now.
        </div>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Register',

  data: () => ({
    error: false,
    valid: true,
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length >= 8) || 'Password has to be at least 8 characters long',
      v => (v && v.length <= 32) || 'Password has to be at most 32 characters long'
    ],
    confirmPassword: '',
    checkbox: false,
    responseReceived: false,
    responseMessage: null
  }),

  methods: {
    register () {
      if (this.$refs.form.validate()) {
        axios
          .post('api/users/register', {
            Email: this.email,
            Password: this.password
          })
          .then(response => {
            this.responseReceived = true
            this.responseMessage = 'User ' + this.email + ' has been registered.'
            this.error = false
          })
          .catch(error => {
            this.responseMessage = error.response.data.message
            this.error = true
          })
      }
    },
    clearForm () {
      this.responseReceived = false
      this.responseMessage = null
      this.error = false
      this.$refs.form.reset()
    }
  }
}
</script>

<style>
a {
  text-decoration: none;
}
</style>
