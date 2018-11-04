<template>
  <div class="rule-group">
    <div class="group-banner">
      <span v-if="isFirstGroup">Select songs with all of these criteria</span>
      <span v-else>OR all of these criteria</span>
    </div>

    <Rule
      v-for="rule in mutatedGroup.rules"
      :key="rule.id"
      :rule="rule"
      @input="onRuleChanged"
      @remove="removeRule(rule)"
    />
    <button @click.prevent="addRule">+ AND</button>
  </div>
</template>

<script>
import models from '../config/models'
import operators from '../config/operators'

export default {
  props: ['group', 'isFirstGroup'],

  components: {
    Rule: () => import('./Rule')
  },

  data: () => ({
    mutatedGroup: {}
  }),

  created () {
    this.mutatedGroup = JSON.parse(JSON.stringify(this.group))
  },

  methods: {
    onRuleChanged (data) {
      let changedRule = this.mutatedGroup.rules.find(r => r.id === data.id)
      Object.assign(changedRule, data)
      this.notifyParentForUpdate()
    },

    addRule () {
      this.mutatedGroup.rules.push(this.createRule())
    },

    createRule () {
      return {
        id: (new Date).getTime(),
        model: models[0].name,
        operator: operators[0].operator,
        value: ['']
      }
    },

    removeRule (rule) {
      this.mutatedGroup.rules = this.mutatedGroup.rules.filter(r => r.id !== rule.id)
      this.notifyParentForUpdate()
    },

    notifyParentForUpdate () {
      this.$emit('input', this.mutatedGroup)
    }
  }
}
</script>

<style lang="scss" scoped>
.rule-group {
  margin-bottom: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #ddd;
}

.group-banner {
  margin-bottom: 16px;
  font-weight: 300;
  font-size: 1.3rem;
  color: #333;
}
</style>
