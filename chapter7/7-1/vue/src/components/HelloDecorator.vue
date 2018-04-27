<!-- src/components/HelloDecorator.vue -->
<!-- This is an alternative way to define the Hello component using decorators -->
<template>
    <div>
        <router-link to='/hello/2'>2</router-link>
        <router-link to='/hello/1'>1</router-link>
        <div class="greeting">Hello {{name}}{{exclamationMarks}}</div>
        <button @click="decrement">-</button>
        <button @click="increment">+</button>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { ComponentOptions } from 'vue'

@Component
export default class HelloDecorator extends Vue
  implements ComponentOptions<HelloDecorator> {
  name = 'decorator'
  enthusiasm = 1

  increment() {
    this.enthusiasm++
  }

  async asyncData({ store }) {
    store.state.name = 'yugo2'
  }

  decrement() {
    if (this.enthusiasm > 1) {
      this.enthusiasm--
    }
  }

  mounted() {
    console.log(this)
  }

  destroyed() {
    console.log('destroy')
  }

  get exclamationMarks(): string {
    return Array.from({ length: this.enthusiasm + 1 }).join('!')
  }
}
</script>

<style lang='stylus'>
.greeting {
  font-size: 20px;
}
</style>
