<template>
  <div class="has-text-centered">
    <div class="notification" :class="{'is-danger': error, 'is-success': success}" v-if="error || success">
      <button class="delete" @click="error = '',success=''"></button>
      {{ error }} {{ success }}
    </div>
    <h2 class="title is-2">注册</h2>
    <p class="subtitle title">好不容易遇见你</p>
    <div class="box">
      <div class="field">
        <div class="control">
          <input class="input" type="text" v-model="email" placeholder="用户邮箱">
        </div>
      </div>
      <div class="field">
        <div class="control">
          <input class="input" type="text" v-model="username" placeholder="用户名">
        </div>
      </div>
      <div class="field">
        <div class="control">
          <input class="input" type="password" v-model="password" placeholder="密码">
        </div>
      </div>
      <div class="field">
        <div class="control">
          <input class="input" type="password" v-model="confirm_password" placeholder="确认密码">
        </div>
      </div>
      <div class="field">
        <div class="control">
          <input class="input" type="text" v-model="code" placeholder="邀请码">
        </div>
      </div>
      <a class="button is-black" @click="submit">
        注册
      </a>
    </div>
    <div class="box has-texte-centered">
      <p>忘记密码了？那就
        <a href="#">找回密码</a> 吧！</p>
      <p>已有账户？那就赶紧
        <a href="#">登陆</a> 吧！</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
  name: 'SignupPage'
})
export default class SignupPage extends Vue {
  username = ''
  email = ''
  password = ''
  confirm_password = ''
  code = ''
  error = ''
  success = ''
  asyncData() {}
  async submit(this: any) {
    try {
      this.error = ''
      const ret = await this.$api.signUp(this.$data)
      if (ret) {
        this.success = '注册成功，请到邮箱激活你的账户后登陆.'
      }
    } catch (e) {
      this.error = e.response.data
    }
  }
}
</script>

<style lang="sass" scoped>
.title
  margin-top: 2rem
  margin-bottom: 2rem

.box:first-of-type
  padding: 2rem
  .field
    margin-bottom: 1rem
    &:last-of-type
      margin-bottom: 1.5rem

.box 
  width: 30%
  +touch
    width: 50%
  +mobile
    width: 70%
  margin: 2rem auto
  box-shadow: none
  &:last-child p
    font-size: .9rem
    a
      color: #000
      border-bottom: 1px solid
.button
  width: 40%
</style>