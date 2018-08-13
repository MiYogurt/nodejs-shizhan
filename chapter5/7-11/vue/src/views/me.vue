<template>
  <div class="container">
    <div class="columns">
      <div class="column is-4">
        <left-menu />
      </div>
      <div class="column is-8">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { ComponentOptions } from 'vue'
import LeftMenu from './me/left-menu.vue'

@Component({
  name: 'MePage',
  components: {
    LeftMenu
  }
})
export default class MePage extends Vue {}
</script>

<style lang="sass" scoped>
</style>
