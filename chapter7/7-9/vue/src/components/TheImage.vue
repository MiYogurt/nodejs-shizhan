<template>
<div v-if="image">
  <router-link :to="'/image/'+image.id">
    <img class="main is-block" v-lazy="'http://127.0.0.1:7001/public/download/'+image.main_url+',1920,1080.jpg'"></img>
  </router-link>
  <div class="info">
  <span class="tag">
    <i class="fas fa-eye">{{ image.id }}</i>
  </span>
  <span class="tag">
    <i class="fas fa-comment">{{ image.ImageComments.length }}</i>
  </span>
  <span class="tag">
    <i class="fas fa-heart">22</i>
  </span>
  </div>
  <div class="author" v-if="showInfo">
    <div class="dropdown is-hoverable">
      <div class="dropdown-trigger">
        <a href="#" class="avatar"><img class="avatar" :src="image.User.avatar" :alt="image.User.username" />{{ image.User.username }}</a>
      </div>
      <div class="dropdown-menu">
        <div class="dropdown-content content has-text-centered">
          <img class="dropdown-avatar" :src="image.User.avatar" :alt="image.User.username" />
          <div class="buttons has-addons is-centered">
            <span class="button is-danger">关注</span>
            <span class="button">私信</span>
          </div>
          <p>我是{{ image.User.username }}，欢迎关注我, {{ image.User.desc }}</p>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
export default {
  name: 'TheImage',
  props: ['image', 'showInfo']
}
</script>

<style lang="sass" scoped>
.column.is-6 .main
  height: auto !important
+touch
  .img-box .main
    height: auto !important
.img-box
  padding: 12px 0
.main
  width: 100%
  background-color: #fff
  background-size: cover
  border-color: none
  height: 150px
  padding: 0.4em 0.4em 0
.info
  background: #fff
  text-align: right
  padding: 0.2em 0
  i::before
    padding-right: .2em
  .tag
    background: #fff
.author
  margin-top: .6em
  .avatar
    display: flex
    font-size: 1em
    img
      width: 1.5em
      height: 1.5em
      margin-right: 10px
      border-radius: 50%
</style>
