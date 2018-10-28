<template>
  <div class="row">
    <div class="logic" v-if="uid">
      <label><input type="radio" v-model="logic" value="and" :name="`logic_${uid}`" checked> and</label>
      <label><input type="radio" v-model="logic" value="or" :name="`logic_${uid}`"> or</label>
    </div>

    <select v-model="selectedModel">
      <option v-for="model in models" :key="model.name" :value="model">{{ model.label }}</option>
    </select>

    <Rule :model="selectedModel" v-if="selectedModel" v-model="ruleExpression" />

    <span class="suffix">
      {{ selectedModel.suffix }}
    </span>
  </div>
</template>

<script>
/*eslint no-console: ["error", { allow: ["log"] }] */
import models from './models'
import Rule from './Rule'

export default {
  components: { Rule },
  props: ['uid'],

  data: () => ({
    logic: 'and',
    models,
    selectedModel: models[0],
    ruleExpression: {}
  }),

  watch: {
    logic () {
      this.emitCompiledRule()
    },

    ruleExpression () {
      this.emitCompiledRule()
    }
  },

  methods: {
    emitCompiledRule () {
      const cloned = JSON.parse(JSON.stringify(this.ruleExpression))
      cloned.logic = this.logic
      this.$emit('input', cloned)
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
