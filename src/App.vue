<template>
  <div class="rules">
    <RuleRow v-for="rule in rules" :key="rule.id" :uid="rule.id" v-model="rule.expression" />
    <button @click.prevent="addRule">Add Rule</button>

    {{ expression }}
  </div>
</template>

<script>
import RuleRow from './components/RuleRow'

export default {
  components: { RuleRow },

  data: () => ({
    rules: [],
    id: 0
  }),

  methods: {
    addRule () {
      this.rules.push({
        id: this.id++,
        expression: ''
      })
    }
  },

  computed: {
    expression () {
      const rawExpression = this.rules.reduce((accumulator, rule) => `${accumulator} ${rule.expression}`, '')
      // trim the leading and|or logical expression
      return rawExpression.replace(/((?:and|or) )/i, '')
    }
  }
}
</script>

<style>
select {
  display: inline-block;
}
</style>
