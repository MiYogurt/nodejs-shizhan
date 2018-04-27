<template>
  <div class="box has-text-centered" v-if="user">
    <img :src="user.avatar" class="avatar" />
    <p class="username">{{ user.username }}</p>
    <p class="desc small">{{ user.desc }}</p>
    <p class="remote" v-if="user.receive_remote">
      <i class="fas fa-laptop"></i> 支持远程
    </p>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { ComponentOptions } from 'vue'

@Component({
  name: 'UserBox',
  props: ['user']
})
export default class UserBox extends Vue {}
</script>

<style lang="sass" scoped>
.box
  box-shadow: none
.avatar
  width: 68px
  height: 68px
  border-radius: 50%
  object-fit: cover
.username
  font-size: 1.5em
  margin: 10px 0 5px
.small
  font-size: .9em
.desc,
.remote
  margin-bottom: 10px

</style>
