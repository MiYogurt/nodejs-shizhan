<template>
  <div id="app">
    <app-header />
    <div class="wrap">
      <div class="container">
        <router-link to="/">/</router-link>
        <router-link to="/hello">hello</router-link>
        <router-link to="/rx">rx</router-link>
        <router-link to="/cool">cool</router-link>
        <a href="#" class="button is-success">123</a>
        <cool/>
        <router-view></router-view>
      </div>
    </div>
    <app-footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AppHeader from '@C/layouts/AppHeader.vue'
import AppFooter from '@C/layouts/AppFooter.vue'
import Cool from '@C/Cool'

@Component({
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
    Cool
  }
})
export default class App extends Vue {
  name = 'done'
  initialEnthusiasm = 1
}
</script>

<style lang="sass" scoped>
.wrap
  background-color: #f8f8f8
  padding: 1em .5em
</style>
