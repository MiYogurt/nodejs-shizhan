<template>
  <div>
    <div class="notification has-text-centered" v-if="msg">
      <button class="delete" @click="msg = ''"></button>
      {{ msg }}
    </div>
    <div class="no-permission" v-if="!hasTeam">
      <div class="notification">
        <p>当前，您没有加入任何团队，或许你可以创建一个。</p>
        <router-link class="button is-black" to="/me/team/create">创建团队</router-link>
      </div>
    </div>
    <div v-if="lock">
      <p>{{team.name}} 已被锁定，请续费</p>
      <router-link class="button is-black" to="/me/team/create">续费</router-link>
    </div>
    <div class="team-block" v-if="team">
      <h3 class="title is-3">
        团队成员
        <button class="button is-black is-pulled-right" @click="show_add_panel=true">添加成员</button>
      </h3>
      <div class="columns">
        <div class="column is-3" v-for="user in team.Users">
          <div class="media">
            <div class="media-left">
              <p class="image is-64x64">
                <img :src="user.avatar">
              </p>
            </div>
            <div class="media-content">
              <h2 class="title is-4">{{user.username}}</h2>
              <p class="subtitle">{{ user.rolename}}</p>
            </div>
          </div>
        </div>
      </div>

      <h3 class="title is-3">团队动态</h3>
      <div class="status">
        <div class="status-item" v-for="status in team.TeamStatuses">
          <p class="time-ago">{{ status.created_at | time }}</p>
          <router-link to="/">{{ status.User.username }}</router-link> 发布了作品
          <router-link to="/">{{ status.title }}</router-link>
          <img class="is-block" :src="status.image_url" v-if="status.type=='image'">
        </div>
      </div>
    </div>

    <div class="add_member_panel" v-if="show_add_panel">
      <div class="field">
        <label class="label">搜索用户
          <span class="close is-pulled-right is-small" @click="show_add_panel=false">关闭</span>
        </label>

        <div class="control">
          <input class="input is-black" type="text" placeholder="请输入用户名" v-model="search_key">
        </div>
      </div>

      <ul>
        <li v-for="user in members" class="is-clearfix member-item">
          {{user.username}}
          <button class="button is-black is-pulled-right is-small" @click="addMember(user.id)">添加为成员</button>
        </li>
      </ul>
      <div v-if="!members.length">暂无用户</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { ComponentOptions } from 'vue'
import { State } from 'vuex-class'
import * as localforage from 'localforage'

let timer = null

@Component({
  name: 'MeTeam',
  beforeRouteEnter(this: any, to, from, next) {
    next((vm: any) => {
      if (vm.team == false) {
        vm.getData()
      }
      next()
    })
  }
})
export default class MeIndex extends Vue {
  hasTeam = false
  lock = false
  team = false
  search_key = ''
  members = []
  show_add_panel = false
  msg = ''
  @State('user_info') info
  @State('user_token') token

  @Watch('info')
  async infoChange(this: any, newValue, oldValue) {
    this.getData()
  }

  @Watch('search_key')
  async getMember(this: any, newValue, oldValue) {
    ~(() => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(async () => {
        const { data } = await this.$api.search(this.token, this.search_key)
        console.log(data)
        this.members = data
      }, 300)
    })()
  }

  async addMember(this: any, user_id) {
    // if (this.team.Users.some(user => user.id === user_id)) {
    //   console.log("已是成员");
    //   return
    // }
    const { data } = await this.$api.addMember(
      this.token,
      user_id,
      this.team.id
    )
    this.msg = '添加成员成功'
    this.show_add_panel = false
  }

  async getData(this: any) {
    console.log('GET DATA')
    if (!this.info) {
      return
    }
    const { data } = await this.$api.getTeam(this.token, this.info.team_id)
    if (data) {
      this.hasTeam = true
    }
    if (data.lock) {
      this.lock = true
    }
    this.team = data
  }
  async mounted(this: any) {}
}
</script>

<style lang="sass" scoped>
.member-item
  margin: 10px 0
.close
  cursor: pointer
.status-item
  margin: 1rem 0
.add_member_panel
  position: absolute
  width: 50%
  height: 400px
  padding: 20px
  top: 20%
  background: #fff
</style>
