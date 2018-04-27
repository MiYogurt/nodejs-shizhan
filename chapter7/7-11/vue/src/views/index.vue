<template>
  <div>
    <nav class="navbar is-black controll-header">
      <div class="container">
        <div class="navbar-menu">
          <div class="navbar-center">
            <div class="dropdown is-hoverable">
              <div class="dropdown-trigger">
                <button class="button" aria-haspopup="true" aria-controls="dropdown-menu1">
                  <span>时间</span>
                  <span class="icon is-small">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                </button>
              </div>
              <div class="dropdown-menu" id="dropdown-menu1" role="menu">
                <div class="dropdown-content">
                  <a class="dropdown-item">
                    最近的
                  </a>
                  <a href="#" class="dropdown-item">
                    以前的
                  </a>
                </div>
              </div>
            </div>
            <div class="dropdown is-hoverable">
              <div class="dropdown-trigger">
                <button class="button" aria-haspopup="true" aria-controls="dropdown-menu2">
                  <span>分类</span>
                  <span class="icon is-small">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                </button>
              </div>
              <div class="dropdown-menu" id="dropdown-menu2" role="menu">
                <div class="dropdown-content">
                  <a class="dropdown-item">
                    移动
                  </a>
                  <a href="#" class="dropdown-item">
                    桌面
                  </a>
                  <a href="#" class="dropdown-item">
                    工业
                  </a>
                </div>
              </div>
            </div>
            <div class="dropdown is-hoverable">
              <div class="dropdown-trigger">
                <button class="button" aria-haspopup="true" aria-controls="dropdown-menu3">
                  <span>标签</span>
                  <span class="icon is-small">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                </button>
              </div>
              <div class="dropdown-menu" id="dropdown-menu3" role="menu">
                <div class="dropdown-content">
                  <a class="dropdown-item">
                    Email
                  </a>
                  <a href="#" class="dropdown-item">
                    插画
                  </a>
                  <a href="#" class="dropdown-item">
                    平面
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="navbar-end is-hidden-touch">
            <a id="type-change-button" class="navbar-item" @click="changeType">
              <i class="fas fa-th-large" v-if="type==='large'"></i>
              <i class="fas fa-th" v-if="type==='normal'"></i>
            </a>
          </div>
        </div>
      </div>
    </nav>

    <div ref="container" class="container">
      <ul class="columns is-multiline img-box">
        <li v-for="(image,index) in images" :key="image.id" class="column" :class="['is-'+ size]">
          <the-image :image="image" :showInfo="true" />
        </li>
      </ul>

      <div class="not-more" v-if="noMore">
        <article class="message">
          <div class="message-body">
            <h2 class="title is-4">莫得啦~</h2>
            <p>更多的画作等待您去创作。</p>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { ComponentOptions } from 'vue'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import TheImage from '@C/TheImage.vue'

const IndexState = namespace('index', State)
const IndexMutation = namespace('index', Mutation)
const IndexAction = namespace('index', Action)

@Component({
  name: 'IndexPage',
  components: {
    TheImage
  }
})
export default class IndexPage extends Vue {
  @IndexState('images') images
  @IndexState('page') page
  @IndexState('all') all
  public type = 'normal'

  @IndexAction('setImages') setImages
  @IndexAction('pushImages') Push

  get size() {
    if (this.type == 'normal') {
      return 3
    }
    return 6
  }

  get noMore() {
    return this.all <= this.page
  }

  async changeType() {
    this.type = this.type == 'normal' ? 'large' : 'normal'
    this.AOSInit()
  }

  async AOSInit() {
    await this.$nextTick()
    const AOS = require('aos')
    AOS.init()
  }

  async asyncData({ store, api }) {
    console.log('Async Data')
    const { data: images } = await api.getImages(1, 24)
    store.dispatch('index/setImages', images)
  }
  async loadMore(this: any) {
    if (this.noMore) {
      return
    }
    try {
      const { data: image } = await this.$api.getImages(this.page + 1, 24)
      this.Push(image)
    } catch (e) {
      console.error(e)
    }
  }
  mounted(this: any) {
    this.AOSInit()
    if (!this.intersectionObserver) {
      this.intersectionObserver = new IntersectionObserver(entries => {
        if (entries[0].intersectionRatio <= 0) return
        this.loadMore()
        console.log('Loaded new items')
      })
      this.intersectionObserver.observe(document.querySelector('footer.footer'))
    }
  }
  destroyed(this: any) {
    this.intersectionObserver.disconnect()
    delete this.intersectionObserver
  }
}
</script>

<style lang="sass" scoped>
.controll-header
  margin: -1em -1em 1em -1em
  .navbar-link
    color: #fff
.navbar-center
  margin-left: auto
  padding-top: 8px
  button.button
    background: #000
    color: #fff
    border-color: #000
  .dropdown-content
    background: #000
    a.dropdown-item
      color: #fff
      &:hover
        background: #333
// 覆盖默认的样式，提高优先级
#type-change-button
  cursor: pointer
  &:hover
    background: #333

// 修正 nav 在 touch 终端隐藏的样式
+touch
  .navbar-menu
    display: flex
    background: #000
    padding: 0
    box-shadow: none
  .navbar-center
    margin-right: auto // 靠左，右边自动
    margin-left: .7em


</style>
