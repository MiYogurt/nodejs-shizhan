<template>
  <div class="comment box is-clearfix">
    <h2>评论</h2>
    <ul>
      <li>
        <div class="comment-header">
          <span class="username">username</span>
          <span class="publish-date">2017-01-22</span>
        </div>
        <div class="content comment-content">
          <p>我是评论</p>
        </div>
        <div class="comment-footer has-text-right">
          <span @click="showComment(1)">
            <i class="fas fa-comments small"></i> 3</span>
          <span>
            <button>回复</button>
          </span>
        </div>
        <transition name="fade">
          <div class="child-comments" v-show="showIndex == 1">
            <div class="comment">
              <div class="comment-header">
                <span class="username">username</span>
                <span class="publish-date">2017-01-22</span>
              </div>
              <div class="content comment-content">
                <p>我是评论</p>
              </div>
            </div>
            <div class="comment">
              <div class="comment-header">
                <span class="username">username</span>
                <span class="publish-date">2017-01-22</span>
              </div>
              <div class="content comment-content">
                <p>我是评论</p>
              </div>
            </div>
            <div class="comment">
              <div class="comment-header">
                <span class="username">username</span>
                <span class="publish-date">2017-01-22</span>
              </div>
              <div class="content comment-content">
                <p>我是评论</p>
              </div>
            </div>
          </div>
        </transition>
      </li>
    </ul>
    <!-- eslint-disable-next-line vue/valid-v-model -->
    <!-- eslint-disable -->
    <div class="comment-input has-text-centered">
      <button class="button is-small" v-if="!showInput" @click="showInput = !showInput">我要评论</button>
      <transition name="fade">
        <div v-if="showInput">
          <at v-model="content" :members="members">
            <div class="quill-editor" v-quill:myQuillEditor="editorOption">
            </div>
          </at>
          <button class="button is-small is-pulled-right" @click="pushComment">提交</button>
        </div>
      </transition>
    </div>

    <!-- <quill-editor></quill-editor> -->

  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { ComponentOptions } from 'vue'

@Component({
  name: 'AppComment',
  components: {},
  props: ['comments', 'author', 'type']
})
export default class CommentPage extends Vue {
  showIndex = 0
  content = ''
  editorOption = {
    theme: 'bubble',
    placeholder: '请输入评论'
  }
  members = []
  showInput = false
  showComment(index) {
    if (this.showIndex == index) {
      this.showIndex = 0
      return
    }
    this.showIndex = index
  }
  mounted() {
    // TODO: 将 Comments 和 Author 里面的用户提取出来赋值给 members
    // TODO: 完善 Push 操作
  }
  pushComment(){
    // this.$api.pushComment('type', this.content)
  }
}
</script>

<style lang="scss" scoped>
.content {
  margin-bottom: 0;
}
.box {
  h2 {
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 20px;
  }
}
.comment {
  margin-bottom: 10px;
}
.comment-header {
  font-size: 0.8rem;
  margin-bottom: 10px;
}

.comment-footer {
  font-size: 0.8rem;
  span {
    cursor: pointer;
  }
  button {
    background: transparent;
    border: none;
  }
}

.child-comments {
  margin-top: 20px;
  .comment {
    margin-left: 20px;
    padding: 10px;
    background: #f7f7f7;
  }
}

.comment ul {
  margin-bottom: 20px;
}
.quill-editor,
.quill-code {
  height: 10rem;
  border: 1px solid #eee;
  margin-top: 10px;
  margin-bottom: 10px;
  font-family: 'STYuanti-SC-Regular';
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
