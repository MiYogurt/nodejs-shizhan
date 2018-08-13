<template>
  <div id="app">
    <app-header></app-header>
    <router-link to="/">/</router-link>
    <router-link to="/hello">hello</router-link>
    <router-link to="/rx">rx</router-link>
    <router-link to="/cool">cool</router-link>
    <a href="#" class="button is-success">123</a>
    <cool/>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AppHeader from '@C/layouts/AppHeader.vue';
import Cool from '@C/Cool';

console.log(Cool)

@Component({
  name: 'App',
  components: {
    AppHeader,
    Cool
  }
})
export default class App extends Vue {
  name = 'done'
  initialEnthusiasm = 1
}
</script>
