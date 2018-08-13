<template>
  <div id="app">
    <app-header />
    <div class="wrap">
      <router-view></router-view>
    </div>
    <app-footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AppHeader from '@C/layouts/AppHeader.vue'
import AppFooter from '@C/layouts/AppFooter.vue'

@Component({
  name: 'App',
  components: {
    AppHeader,
    AppFooter
  }
})
export default class App extends Vue {}
</script>

<style lang="sass" scoped>
.wrap
  background-color: #f8f8f8
  padding: 1em .5em
</style>
