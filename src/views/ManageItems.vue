<template>
  <v-container ma-15>
    <v-row>
      <v-col cols="5">
        <v-toolbar>
          <ChooseItem v-model="value" ref="chooseItem"></ChooseItem>
          <v-btn icon @click="deleteItem">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-toolbar>
        <div class="pt-5 pl-10">{{ responseMessageSubmit }}</div>
      </v-col>
      <v-spacer />
      <v-divider vertical></v-divider>
      <v-spacer />
      <v-col cols="5">
        <v-form v-model="valid" ref="form">
          <v-text-field
            v-model="itemName"
            :rules="itemNameRules"
            label="Item name"
            required
          ></v-text-field>
          <v-text-field
            class="pb-6"
            v-model="itemType"
            :rules="itemTypeRules"
            label="Item type"
            required
          ></v-text-field>
          <v-btn class="ml-4" @click="submit"> submit </v-btn>
          <v-btn class="ml-4" @click="clearForm"> clear </v-btn>
          <div class="pt-5 pl-10">{{ responseMessageDelete }}</div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { requests } from '../requests-common'

import ChooseItem from '../components/ChooseItem.vue'

export default {
  name: 'ManageItems',

  data: () => ({
    error: false,
    valid: false,
    itemName: '',
    itemNameRules: [(v) => !!v || 'Name is required'],
    itemType: '',
    itemTypeRules: [(v) => !!v || 'Item type is required'],
    responseReceived: false,
    responseMessageDelete: null,
    responseMessageSubmit: null,
    value: null
  }),

  components: {
    ChooseItem
  },

  methods: {
    deleteItem () {
      if (this.value) {
        requests
          .delete('api/items/' + this.value, {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }
          })
          .then((response) => {
            this.responseReceived = true
            this.responseMessageSubmit = 'Item has been successfully deleted'
            this.error = false
          })
          .catch((error) => {
            this.responseReceived = true
            this.responseMessageSubmit = error.response.data.message
            this.error = true
          })
          .finally(() => {
            this.$refs.chooseItem.loadItems()
          })
      }
    },
    submit () {
      if (this.$refs.form.validate()) {
        requests
          .post('api/items', {
            Name: this.itemName,
            ItemType: this.itemType
          }, {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }
          })
          .then((response) => {
            this.responseReceived = true
            this.responseMessageDelete = 'Item has been added'
            this.error = false
          })
          .catch((error) => {
            this.responseReceived = true
            this.responseMessageDelete = error.response.data.message
            this.error = true
          })
          .finally(() => {
            this.$refs.chooseItem.loadItems()
            this.clearForm()
          })
      }
    },
    clearForm () {
      this.$refs.form.reset()
    }
  }
}
</script>
