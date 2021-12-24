<template>
  <v-autocomplete
    :value="value"
    :loading="loading"
    :items="filteredItems"
    item-text="name"
    item-value="itemId"
    :search-input.sync="search"
    hide-no-data
    hide-details
    label="Which item do you want to choose?"
    flat
    @input="updateValue"
  />
</template>

<script>
import axios from 'axios'

export default {
  name: 'ChooseItem',

  data: () => ({
    items: null,
    filteredItems: null,
    loading: false,
    error: false,
    search: null
  }),

  props: ['value'],

  beforeMount () {
    this.loadItems()
  },

  watch: {
    search (val) {
      val && val !== this.select && this.querySelections(val)
    }
  },

  methods: {
    querySelections (v) {
      this.loading = true
      setTimeout(() => {
        this.filteredItems = this.items.filter((e) => {
          if (
            (e.name || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
          ) {
            return e
          }
          return null
        })
        this.loading = false
      }, 500)
    },
    updateValue (value) {
      this.$emit('input', value)
    },
    loadItems () {
      if (this.loading) return

      this.loading = true

      axios
        .get('api/items')
        .then((response) => {
          this.items = response.data
          this.filteredItems = this.items
        })
        .catch((error) => {
          console.log(error)
          this.error = true
        })
        .finally(() => (this.loading = false))
    }
  }
}
</script>
