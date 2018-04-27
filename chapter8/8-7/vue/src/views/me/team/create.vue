<template>
  <div>
    <div class="field">
      <label class="label">团队名字</label>
      <div class="control">
        <input class="input" type="text" placeholder="团队名字" v-model="name">
      </div>
    </div>
    <div class="field">
      <label class="label">团队简介</label>
      <div class="control">
        <input class="input" type="text" placeholder="团队简介" v-model="profile">
      </div>
    </div>
    <button class="button is-black" @click="submit">创建</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { ComponentOptions } from 'vue'
import { State } from 'vuex-class'
import * as localforage from 'localforage'

let timer = null

@Component({
  name: 'MeTeamCreate',
  beforeRouteEnter(this: any, to, from, next) {
    next((vm: any) => {
      vm.check(vm.token)
      next()
    })
  }
})
export default class MeTeamCreate extends Vue {
  @State('user_token') token
  @State('user_info') user
  name = ''
  profile = ''
  checked = false
  @Watch('user')
  async check(this: any) {
    console.log(this)
    if (!this.token || this.checked) {
      return
    }
    try {
      const { data } = await this.$api.checkCanCreatTeam(this.token)
      if (data == false) {
        window.location.href = 'http://localhost:7001/alipay/pay/10'
      }
    } catch (e) {
      window.location.href = 'http://localhost:7001/alipay/pay/10'
    }
    this.checked = true
  }

  async submit(this: any) {
    const { data } = await this.$api.createTeam(this.token, {
      name: this.name,
      profile: this.profile
    })
    if (data) {
      await localforage.setItem('user_token', data)
      this.$store.commit('USER_TOKEN', data)
      const { data: { user } } = await this.$api.getUser(data)
      this.$store.commit('USER_INFO', user)
      this.$router.push('/me/team')
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
