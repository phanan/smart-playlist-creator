<template>
  <div class="wrapper">
    <form class="rules" @submit.prevent="submit">
      <RuleGroup
        v-for="(group, index) in ruleGroups"
        :isFirstGroup="index === 0"
        :key="group.id"
        :group="group"
        @input="onGroupChanged"
      />

      <button @click.prevent="addGroup">+ OR</button>

    </form>
    <pre class="preview">{{ ruleGroups }}</pre>
  </div>
</template>

<script>
import initData from './stubs/data'

export default {
  components: {
    RuleGroup: () => import('./components/RuleGroup')
  },

  data: () => ({
    ruleGroups: JSON.parse(JSON.stringify(initData))
  }),

  methods: {
    addGroup () {
      this.ruleGroups.push(this.createGroup())
    },

    onGroupChanged (data) {
      let changedGroup = this.ruleGroups.find(g => g.id === data.id)
      changedGroup = Object.assign(changedGroup, data)

      // Remove empty group
      if (changedGroup.rules.length === 0) {
        this.ruleGroups = this.ruleGroups.filter(group => group.id !== changedGroup.id)
      }
    },

    createGroup () {
      return {
        id: (new Date).getTime(),
        rules: []
      }
    }
  }
}
</script>

<style lang="scss">
*, *::before, *::after {
  box-sizing: border-box;
  color: #333;
}

p, div {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 14px;
}

select, button, input {
  display: inline-block;
  background: #fff;
  height: 24px;
  padding: 0 8px;
  border: 1px solid #dadfe2;
  border-radius: 3px;
  margin-right: 4px;
}

select, input {
  width: 128px;
}

button {
  background: #f1f4f5;
  cursor: pointer;
}

.wrapper {
  display: flex;

  > form, > pre {
    flex-grow: 1;
    flex-basis: 0;
    padding: 15px;
  }

  pre {
    font-family: Monaco, Consolas, Courier, monospace;
    font-size: .7rem;
    line-height: 1.4;
    background: #f1f4f5;
    min-height: 100vh;
  }
}
</style>
