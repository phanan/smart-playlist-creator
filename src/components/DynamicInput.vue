<template>
  <input :type="type" v-model="mutableValue">
</template>

<script>
import types from './types'

export default {
  props: {
    type: {
      type: String,
      validator: value => Object.keys(types).includes(value)
    },

    value: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      mutableValue: this.value
    }
  },

  watch: {
    mutableValue () {
      this.$emit('input', this.mutableValue)
    }
  }
}
</script>

