<template>
  <div class="container">
    <div class="columns">
      <div class="column is-8">
        <div class="box">
          <pswp ref="pswp"/>
          <h3 class="title is-3">{{ image.title }}</h3>
          <div class="main">
            <img :src="main" @click="showPhoto">
          </div>
          <div class="list-img">
            <img v-for="img in list" :src="img">
          </div>

          <div class="content">
            {{ image.description }}
          </div>
        </div>
      </div>
      <div class="column is-4">
        <user-box :user="image.User" />
      </div>
    </div>

    <app-comment :author="image.User" :comments="image.ImageComments" type="image" @push="pushComment" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { ComponentOptions } from 'vue'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import AppComment from '@C/AppComment.vue'
import UserBox from '@C/UserBox.vue'
import pswp from '@C/Pswp.vue'

import PhotoSwipe from 'photoswipe/dist/photoswipe.js'
import PhotoSwipeUI from 'photoswipe/dist/photoswipe-ui-default.js'

const ImageDetailState = namespace('image', State)
const ImageDetailMutation = namespace('image', Mutation)
const ImageDetailGetter = namespace('image', Getter)

@Component({
  name: 'ImageDetailPage',
  components: {
    AppComment,
    UserBox,
    pswp
  }
})
export default class ImageDetailPage extends Vue {
  @ImageDetailState(state => state)
  image: any
  @ImageDetailGetter('main') main: string
  @ImageDetailGetter('list') list: string[]
  @State('user_token') token
  @State('user_info') user
  @ImageDetailMutation('PUSH_COMMENT') push_comment
  galleryOptions = {
    history: false,
    focus: false,
    shareEl: false,
    showAnimationDuration: 0,
    hideAnimationDuration: 0
  }

  async asyncData({ store, api, route }) {
    const { id } = route.params
    const image = await api.getImage(id)
    store.commit('image/SET_IMAGE', image)
  }
  showPhoto() {
    const item = [this.main].concat(this.list).map(src => {
      const arr = src.split(',').reverse()
      const w = parseInt(arr[1]) || 350
      const h = arr[0].split('.')[0] || 120
      return {
        src,
        w,
        h
      }
    })
    let gallery = new PhotoSwipe(
      (this.$refs.pswp as any).$el,
      PhotoSwipeUI,
      item,
      this.galleryOptions
    )
    gallery.init()
  }

  async pushComment(this: any, content, parent_id) {
    const { data } = await this.$api.pushImageComment(
      this.token,
      content,
      this.image.id
    )
    console.log(data)
    data.User = this.user
    data.childeren = []
    this.push_comment(data)
  }
}
</script>

<style lang="sass">
$pswp__assets-path : '../asserts/default-skin/'
@import '~photoswipe/src/css/main.scss'
@import '~photoswipe/src/css/default-skin/default-skin.scss'
</style>

<style lang="sass" scoped>

.list-img
  display: flex
  margin: 10px 0 20px
  img
    max-width: 24%
    margin-right: .5%
    object-fit: cover
    height: 100px
</style>
