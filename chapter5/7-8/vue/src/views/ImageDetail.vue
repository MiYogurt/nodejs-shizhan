<template>
  <div class="container">
    <div class="columns">
      <div class="column is-8">
        <div class="box">
          <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true" ref="pswp">
            <div class="pswp__bg"></div>
            <div class="pswp__scroll-wrap">

              <div class="pswp__container">
                <div class="pswp__item"></div>
                <div class="pswp__item"></div>
                <div class="pswp__item"></div>
              </div>

              <div class="pswp__ui pswp__ui--hidden">

                <div class="pswp__top-bar">

                  <div class="pswp__counter"></div>

                  <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>

                  <button class="pswp__button pswp__button--share" title="Share"></button>

                  <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>

                  <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
                  <div class="pswp__preloader">
                    <div class="pswp__preloader__icn">
                      <div class="pswp__preloader__cut">
                        <div class="pswp__preloader__donut"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                  <div class="pswp__share-tooltip"></div>
                </div>

                <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
                </button>

                <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
                </button>

                <div class="pswp__caption">
                  <div class="pswp__caption__center"></div>
                </div>

              </div>

            </div>
          </div>
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
        <div class="box has-text-centered">
          <img :src="image.User.avatar" class="avatar" />
          <p class="username">{{ image.User.username }}</p>
          <p class="desc small">{{ image.User.desc }}</p>
          <p class="remote" v-if="image.User.receive_remote">
            <i class="fas fa-laptop"></i> 支持远程</p>
        </div>
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

import PhotoSwipe from 'photoswipe/dist/photoswipe.js'
import PhotoSwipeUI from 'photoswipe/dist/photoswipe-ui-default.js'

const ImageDetailState = namespace('image', State)
const ImageDetailMutation = namespace('image', Mutation)
const ImageDetailGetter = namespace('image', Getter)

@Component({
  name: 'ImageDetailPage',
  components: {
    AppComment
  }
})
export default class ImageDetailPage extends Vue {
  @ImageDetailState(state => state) image: any
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
      this.$refs.pswp,
      PhotoSwipeUI,
      item,
      this.galleryOptions
    )
    gallery.init()
  }
  mounted() {
  }

  async pushComment(this: any, content, parent_id){
    const {data} = await this.$api.pushImageComment(this.token, content, this.image.id)
    console.log(data);
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

.list-img
  display: flex
  margin: 10px 0 20px
  img
    max-width: 24%
    margin-right: .5%
    object-fit: cover
    height: 100px
</style>
