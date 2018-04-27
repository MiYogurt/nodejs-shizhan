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

          <div class="main">
            <img src="http://127.0.0.1:7001/public/download/10010677,1920,1080.jpg" @click="showPhoto">
          </div>
          <div class="list-img">
            <img src="http://127.0.0.1:7001/public/download/10010677,1920,1080.jpg">
            <img src="http://127.0.0.1:7001/public/download/10010677,1920,1080.jpg">
            <img src="http://127.0.0.1:7001/public/download/10010677,1920,1080.jpg">
          </div>

          <div class="content">
            这是我家的狗狗，可爱不。
          </div>
        </div>
      </div>
      <div class="column is-4">
        <div class="box has-text-centered">
          <img src="http://127.0.0.1:7001/public/download/10010677,1920,1080.jpg" class="avatar" />
          <p class="username">username</p>
          <p class="desc small">desc</p>
          <p class="remote">
            <i class="fas fa-laptop"></i> 支持远程</p>
        </div>
      </div>
    </div>

    <app-comment />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { ComponentOptions } from 'vue'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import AppComment from '@C/AppComment.vue'

import PhotoSwipe from 'photoswipe/dist/photoswipe.js'
import PhotoSwipeUI from 'photoswipe/dist/photoswipe-ui-default.js'

const ImageDetailState = namespace('ImageDetail', State)
const ImageDetailMutation = namespace('ImageDetail', Mutation)

@Component({
  name: 'ImageDetailPage',
  components: {
    AppComment
  }
})
export default class ImageDetailPage extends Vue {
  galleryOptions = {
    history: false,
    focus: false,
    shareEl: false,
    showAnimationDuration: 0,
    hideAnimationDuration: 0
  }
  items = [
    {
      src: 'https://farm2.staticflickr.com/1043/5186867718_06b2e9e551_b.jpg',
      w: 1024,
      h: 964
    },
    {
      src: 'https://farm7.staticflickr.com/6175/6176698785_7dee72237e_b.jpg',
      w: 1024,
      h: 683
    }
  ]
  showPhoto() {
    let gallery = new PhotoSwipe(
      this.$refs.pswp,
      PhotoSwipeUI,
      this.items,
      this.galleryOptions
    )
    gallery.init()
  }
  mounted() {
    // build items array
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
