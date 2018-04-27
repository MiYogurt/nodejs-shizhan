<template lang="pug">
div
  .greeting Hello {{name}} {{exclamationMarks}}
  button(@click="decrement") -
  button(@click="increment") +
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      name: '123',
      enthusiasm: 1
    }
  },
  methods: {
    increment() {
      this.enthusiasm++
    },
    decrement() {
      if (this.enthusiasm > 1) {
        this.enthusiasm--
      }
    }
  },
  mounted() {
    console.log(this)
  },
  async asyncData({ store }) {
    store.state.name = 'yugo1'
    console.log(store.state)
  },
  computed: {
    exclamationMarks(): string {
      return Array.from({ length: this.enthusiasm + 1 }).join('!')
    }
  }
})
</script>

<style>
.greeting {
  font-size: 20px;
  color: #378;
}
</style>
