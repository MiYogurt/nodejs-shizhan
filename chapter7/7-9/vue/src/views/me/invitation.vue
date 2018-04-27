<template>
  <div class="box">
    <div class="columns is-multiline">
      <div v-for="i in invitations" class="column is-3">
        <div class="box" :class="{'used': i.use_user_id} ">
          <p>{{ i.code }}</p>
          <p v-if="i.use_username">已被 {{ i.use_username }} 使用</p>
          <p v-else><a href="#">通过邮件发送</a></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { ComponentOptions } from 'vue'
import * as localforage from 'localforage'

@Component({
  name: 'MeInvitation'
})
export default class MeInvitation extends Vue {
  invitations = []
  async mounted(this: any) {
    const token = await localforage.getItem('user_token')
    const { data } = await this.$api.getAllInvitationForMe(token)
    this.invitations = data
  }
}
</script>

<style lang="sass" scoped>
.box
  box-shadow: none
.is-3 .box
  background: #000
  color: #fff
  text-align: center
  p a
    color: #fff
.is-3 .box.used
  background: #eee
  color: #333
</style>
