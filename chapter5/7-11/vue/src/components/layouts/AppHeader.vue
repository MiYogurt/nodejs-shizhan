<template lang="pug">
nav.navbar: .container
  .navbar-brand
    router-link.navbar-item(to="/" exact-active-class="no-active")
      img(src="/public/logo.png", alt="喵喵看世界")
    .navbar-burger.burger(v-bind:class="{ 'is-active': isActive }" data-target="navbar-app" v-on:click="toggleNavBar")
      span
      span
      span
  #navbar-app.navbar-menu(v-bind:class="{ 'is-active': isActive }")
    .navbar-start
      router-link.navbar-item(to="/team") 团队
      router-link.navbar-item(to="/blog") 博客
      router-link.navbar-item(to="/podcast") 播客
    .navbar-end
      template(v-if="user_info")
        router-link.navbar-item(to="/me", v-text="user_info.username")
        a.navbar-item(v-on:click="logout") 注销
      template(v-else)
        router-link.navbar-item(to="/signup") 注册
        router-link.navbar-item(to="/signin") 登陆

</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { ComponentOptions } from 'Vue'
import { State } from 'vuex-class'
import * as local from 'localforage'
@Component({
  name: 'AppHeader'
})
export default class extends Vue {
  public isActive: boolean = false
  @State('user_info') user_info: object
  public toggleNavBar() {
    this.isActive = !this.isActive
  }
  logout(this: any) {
    this.$store.commit('USER_TOKEN', '')
    this.$store.commit('USER_INFO', '')
    local.removeItem('user_token')
  }
}
</script>

<style lang="sass" scoped>
.router-link-exact-active
  color: dark($link, 30)
  background: whitesmoke
</style>
