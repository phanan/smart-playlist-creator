<template>
  <form class="rules" @submit.prevent="submit">
    <RuleRow v-for="rule in rules" :key="rule.id" :rule="rule" @input="updateRule" />
    <button @click.prevent="addRule">Add Rule</button>

    <!-- <pre>{{ ruleConfig }}</pre> -->

    <button type="submit">Submit</button>
  </form>
</template>

<script>
import models from './components/models'
import RuleRow from './components/RuleRow'
import initData from './stubs/data'

export default {
  components: { RuleRow },

  data: () => ({
    id: 0,
    rules: []
  }),

  methods: {
    addRule () {
      this.rules.push(this.createRule())
    },

    createRule (logic = 'and', model = 'title', operator = '=', value = []) {
      return {
        logic,
        operator,
        value,
        id: this.id++,
        model: models.find(m => m.name === model)
      }
    },

    jsontify (rule) {
      return {
        logic: rule.logic,
        model: rule.model.name,
        operator: rule.operator,
        value: rule.value
      }
    },

    submit () {

    },

    updateRule(mutatedRule) {
      const changedRule = this.rules.find(r => r.id === mutatedRule.id)
      for (const prop in mutatedRule) {
        changedRule[prop] = mutatedRule[prop]
      }
    }
  },

  created () {
    initData.forEach(rule => {
      this.rules.push(this.createRule(rule.logic, rule.model, rule.operator, rule.value))
    })
  },

  computed: {
    ruleConfig () {
      return this.rules.map(rule => this.jsontify(rule))
    }
  }
}
</script>

<style>
select {
  display: inline-block;
}
</style>
