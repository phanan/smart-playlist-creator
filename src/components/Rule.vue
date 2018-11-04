<template>
  <div>
    <select v-model="selectedOption">
      <option v-for="option in options" :value="option" :key="option.operator">{{ option.label }}</option>
    </select>

    <dynamic-input
      v-for="input in availableInputs"
      :key="input.id"
      :type="selectedOption.type || model.type"
      v-model="input.value"
      @input="onInput"
    />
  </div>
</template>

<script>
import types from '../config/types'
import DynamicInput from './DynamicInput'

export default {
  components: { DynamicInput },

  props: ['model'],

  data: () => ({
    selectedOption: null
  }),

  computed: {
    options () {
      return types[this.model.type]
    },

    availableInputs () {
      if (!this.selectedOption) {
        return []
      }

      const inputs = []

      for (let i = 0, inputCount =  this.selectedOption.inputs || 1; i < inputCount; ++i) {
        inputs.push({ id: `${this.model.name}_${this.selectedOption.operator}_${i}`, value: ''})
      }

      return inputs
    }
  },

  created () {
    this.selectedOption = this.options[0]
  },

  methods: {
    onInput () {
      this.$emit('input', {
        model: this.model.name,
        operator: this.selectedOption.operator,
        value: this.availableInputs.map(input => input.value)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
div {
  display: inline
}
</style>
