<template>
  <div class="row">
    <div class="logic" v-if="!first">
      <label><input type="radio" v-model="mutatedRule.logic" value="and" :name="`logic_${mutatedRule.id}`" checked> and</label>
      <label><input type="radio" v-model="mutatedRule.logic" value="or" :name="`logic_${mutatedRule.id}`"> or</label>
    </div>

    <select v-model="selectedModel">
      <option v-for="model in models" :key="model.name" :value="model">{{ model.label }}</option>
    </select>

    <select v-model="selectedOperator">
      <option v-for="option in options" :value="option" :key="option.operator">{{ option.label }}</option>
    </select>

    <dynamic-input
      v-for="input in availableInputs"
      :key="input.id"
      :type="selectedOperator.type || selectedModel.type"
      v-model="input.value"
      @input="onInput"
    />

    <span class="suffix">{{ selectedOperator.unit || selectedModel.unit }}</span>
    <button @click.prevent="removeRule">Remove</button>
  </div>
</template>

<script>
import models from './models'
import types from './types'
import Rule from './Rule'
import DynamicInput from './DynamicInput'

export default {
  components: { Rule, DynamicInput },
  props: ['rule', 'first'],

  data: () => ({
    models,
    selectedModel: null,
    selectedOperator: null,
    inputValues: [],
    mutatedRule: {},
  }),

  watch: {
    options () {
      if (this.selectedModel === this.mutatedRule.model) {
        this.selectedOperator = this.options.find(o => o.operator === this.mutatedRule.operator)
      } else {
        this.selectedOperator = this.options[0]
      }
    },

    'mutatedRule.logic' () {
      this.onInput()
    }
  },

  computed: {
    options () {
      return this.selectedModel ? types[this.selectedModel.type] : []
    },

    availableInputs () {
      if (!this.selectedOperator) {
        return []
      }

      const inputs = []

      for (let i = 0, inputCount =  this.selectedOperator.inputs || 1; i < inputCount; ++i) {
        inputs.push({
          id: `${this.mutatedRule.model.name}_${this.selectedOperator.operator}_${i}`,
          value: this.isOriginalOperatorSelected ? this.mutatedRule.value[i] : ''
        })
      }

      return inputs
    },

    isOriginalOperatorSelected () {
      return this.selectedModel === this.mutatedRule.model &&
        this.selectedOperator.operator === this.mutatedRule.operator
    }
  },

  created () {
    this.mutatedRule = Object.assign({}, this.rule)
    this.selectedModel = this.models.find(m => m === this.mutatedRule.model)
    this.selectedOperator = this.options.find(o => o.operator === this.mutatedRule.operator)
  },

  methods: {
    onInput () {
      this.$emit('input', {
        id: this.mutatedRule.id,
        logic: this.mutatedRule.logic,
        model: this.selectedModel,
        operator: this.selectedOperator.operator,
        value: this.availableInputs.map(input => input.value)
      })
    },

    removeRule () {
      this.$emit('remove')
    }
  }
}
</script>

<style lang="scss" scoped>
.row {
  display: block;
  padding: .5rem 0;
  border-bottom: 1px solid #ccc;

  input {
    border: 1px solid #ccc;
  }
}
</style>
