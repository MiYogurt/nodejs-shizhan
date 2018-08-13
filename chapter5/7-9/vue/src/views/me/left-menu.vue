<template>
  <div>
    <user-box :user="user_info"/>
    <aside class="menu box">
      <p class="menu-label">
        联系我
      </p>
      <ul class="menu-list concat-me" v-if="user_info">
        <li>微博： {{ user_info.weibo }}</li>
        <li>微信：{{ user_info.weixin }}</a></li>
        <li>邮件：{{ user_info.email }}</a></li>
      </ul>
      <p class="menu-label">
        管理菜单
      </p>
      <ul class="menu-list">
        <li><router-link to="/me/invitation">我的邀请码</router-link></li>
      </ul>

    </aside>
  </div>

</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { ComponentOptions } from 'vue'
import UserBox from '@C/UserBox.vue'
import { State } from 'vuex-class'
@Component({
  name: 'LeftMenu',
  components: {
    UserBox
  }
})
export default class LeftMenu extends Vue {
  @State('user_info') user_info
}
</script>

<style lang="sass" scoped>
.box
  box-shadow: none
.concat-me li
  margin: .7rem 0
</style>
