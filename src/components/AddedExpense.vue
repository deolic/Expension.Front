<template>
  <div>
    <v-container
      v-for="boughtItem in expense.boughtItems"
      :key="boughtItem.boughtItemId"
    >
      <v-card
        class="pa-2"
        outlined
        tile
      >
        <v-row no-gutters>
          <v-col class="ml-5">{{ boughtItem.name }}</v-col>
          <v-col>{{ boughtItem.itemType }}</v-col>
          <v-col>{{ boughtItem.price }}</v-col>
          <v-btn @click="deleteBoughtItem(boughtItem.boughtItemId)" plain color="red" class="text-body-2">Delete BoughtItem</v-btn>
        </v-row>
      </v-card>
    </v-container>
    <v-row class="mx-4 my-2" justify="center">
      <v-btn @click="showBoughtItemForm" v-if="!boughtItemForm">
        BoughtItem <v-icon>mdi-plus-circle</v-icon>
      </v-btn>
      <v-form v-if="boughtItemForm" class="mx-4" v-model="valid" ref="form">
        <v-row>
          <ChooseItem v-model="value"></ChooseItem>
          <v-text-field
            v-model="price"
            :rules="priceFormRules"
            label="Price"
            required
            class="mx-4"
          ></v-text-field>
          <template class="text-xs-right">
            <v-btn @click="addBoughtItem" x-small fab class="my-4" color="light-green">
              <v-icon>mdi-plus-circle</v-icon>
            </v-btn>
            <v-btn @click="clearForm" x-small fab class="my-4" color="red">
              <v-icon>mdi-close-circle</v-icon>
            </v-btn>
          </template>
        </v-row>
      </v-form>
    </v-row>
    <v-row class="ma-5" justify="space-between">
      <template>
        <b>Summary – you spent: {{ sum }}</b>
      </template>
      <template>
        <b>{{ expenseDateString }}</b>
      </template>
      <v-btn @click="deleteExpense" color="red">
        Delete Expense
      </v-btn>
    </v-row>
  </div>
</template>

<script>
import axios from 'axios'
import { format, parseISO } from 'date-fns'

import ChooseItem from '../components/ChooseItem.vue'

export default {
  name: 'AddedExpense',

  data: () => ({
    error: false,
    loading: false,
    valid: false,
    responseReceived: false,
    responseMessage: null,
    boughtItemForm: false,
    value: null,
    price: null,
    priceFormRules: [
      v => !!v || 'Price is required',
      v => /^[0-9]+(.|,)?[0-9]{0,2}$/.test(v) || 'Price must be a number'
    ]
  }),

  props: ['expense'],

  components: {
    ChooseItem
  },

  computed: {
    sum () {
      let temp = 0
      for (const boughtItem of this.expense.boughtItems) {
        temp += boughtItem.price
      }
      return temp
    },
    expenseDate () {
      return parseISO(this.expense.date)
    },
    expenseDateString () {
      return format(this.expenseDate, 'dd/MM/yyyy')
    }
  },

  methods: {
    addBoughtItem () {
      if (this.$refs.form.validate()) {
        axios
          .post(
            'api/bought-items',
            {
              ItemId: this.value,
              Price: this.price,
              ExpenseId: this.expense.expenseId
            },
            {
              headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
              }
            }
          )
          .then((response) => {
            this.responseReceived = true
            this.responseMessage = 'BoughtItem has been added'
            this.error = false
          })
          .catch((error) => {
            this.responseReceived = true
            this.responseMessage = error.response.data.message
            this.error = true
          })
          .finally(() => {
            this.loadBoughtItems()
            this.clearForm()
          })
      }
    },
    deleteExpense () {
      axios
        .delete(
          'api/expenses/' + this.expense.expenseId,
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }
          }
        )
        .then((response) => {
          this.responseReceived = true
          this.responseMessage = 'Expense has been deleted'
          this.error = false
        })
        .catch((error) => {
          this.responseReceived = true
          this.responseMessage = error.response.data.message
          this.error = true
        })
        .finally(() => {
          this.boughtItemForm = false
          this.$emit('deleteExpense')
        })
    },
    deleteBoughtItem (boughtItem) {
      axios
        .delete(
          'api/bought-items/' + boughtItem,
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }
          }
        )
        .then((response) => {
          this.responseReceived = true
          this.responseMessage = 'BoughtItem has been deleted'
          this.error = false
        })
        .catch((error) => {
          this.responseReceived = true
          this.responseMessage = error.response.data.message
          this.error = true
        })
        .finally(() => {
          this.loadBoughtItems()
          this.clearForm()
        })
    },
    loadBoughtItems () {
      if (this.loading) return

      this.loading = true

      axios
        .get('api/expenses/' + this.expense.expenseId,
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }
          })
        .then((response) => {
          this.expense = response.data
        })
        .catch((error) => {
          console.log(error)
          this.error = true
        })
        .finally(() => (this.loading = false))
    },
    showBoughtItemForm () {
      this.boughtItemForm = true
    },
    clearForm () {
      this.boughtItemForm = false
      this.$refs.form.reset()
    }
  }
}
</script>
