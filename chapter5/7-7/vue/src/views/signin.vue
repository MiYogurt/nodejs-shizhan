<template>
  <div class="container">
    <div class="notification has-text-centered" :class="{'is-danger': error, 'is-success': success}" v-if="error || success">
      <button class="delete" @click="error = '',success=''"></button>
      {{ error }} {{ success }}
    </div>
    <div class="columns">
      <div class="is-6 column has-text-centered">
        <img src="/public/footer-logo.png" alt="" class="logo">
        <h2 class="title is-2">欢迎回来...</h2>
      </div>
      <div class="column is-4 is-offset-2">
        <div class="box is-clearfix">
          <div class="top">
            <a class="button is-block is-black" href="http://ba49194b.ngrok.io/passport/github">
              <i class="fab fa-github"></i> Github 登陆</a>
          </div>
          <div class="form">
            <div class="field">
              <div class="control">
                <input class="input" type="text" v-model="email" placeholder="用户邮箱">
              </div>
            </div>
            <div class="field">
              <div class="control">
                <input class="input" type="password" v-model="password" placeholder="密码">
              </div>
            </div>
          </div>
          <button class="button is-pulled-right" @click="submit">登陆</button>
        </div>
        <div class="box">
          <p class="has-text-centered">
            忘记密码了？那
            <a href="#">找回密码</a>吧。<br/> 没有账户？赶紧
            <a href="#">注册</a>吧！</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { ComponentOptions } from 'vue'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import * as local from 'localforage'

@Component<Vue>({
  name: 'SigninPage',
  beforeRouteEnter(to, from, next) {
    if (isClient) {
      if (to.query.token) {
        local
          .setItem('user_token', to.query.token)
          .then(token => {
            return next((vm: SigninPage | any) => {
              console.log(vm)
              vm.$api
                .getUser(token)
                .then(user_info =>
                  vm.$store.commit('USER_INFO', user_info.data.user)
                )
                .catch(console.error)
            })
          })
          .then(() => next('/'))
          .catch(next)
      } else {
        local
          .getItem('user_token')
          .then(token => {
            if (token) return next('/')
            next()
          })
          .catch(next)
      }
    }
    next()
  }
})
export default class SigninPage extends Vue {
  password = ''
  email = ''
  error = ''
  success = ''
  @State('user_token') user_token
  @Mutation('USER_INFO') USER_INFO: any

  async submit(this: any) {
    this.error = ''
    this.success = ''
    try {
      const { data } = await this.$api.signIn({
        email: this.email,
        password: this.password
      })
      await local.setItem('user_token', data)
      this.success = '登陆成功'
      const { data: { user } } = await this.$api.getUser(data)
      this.USER_INFO(user)
      setTimeout(() => {
        this.$router.push('/')
      }, 500)
    } catch (e) {
      this.error = e.response.data
    }
  }
}
</script>

<style lang="sass" scoped>
.top
  padding: .5rem 0 1rem

.box
  box-shadow: none

.box > button
  margin-top: 1rem
.box > p.has-text-centered
  font-size: .8rem

.logo
  width: 190px
  margin: 0 auto 2rem
.is-6.has-text-centered
  display: flex
  align-content: center
  flex-direction: column
  justify-content: center
</style>
