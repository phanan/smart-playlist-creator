<template>
  <div class="rules">
    <RuleRow v-for="rule in rules" :key="rule.id" :uid="rule.id" v-model="rule.config" />
    <button @click.prevent="addRule">Add Rule</button>

    <pre>{{ ruleConfig }}</pre>
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
        config: {}
      })
    }
  },

  computed: {
    ruleConfig () {
      return this.rules.map(rule => rule.config)
    }
  }
}
</script>

<style>
select {
  display: inline-block;
}
</style>
