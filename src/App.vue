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

    <a class="github" href="https://github.com/phanan/smart-playlist-creator">
      <svg height="32" class="octicon octicon-mark-github" viewBox="0 0 16 16" width="32">
        <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
      </svg>
    </a>
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

a.github {
  position: fixed;
  right: 16px;
  top: 12px;
  opacity: .5;

  &:hover {
    opacity: 1;
  }
}
</style>
