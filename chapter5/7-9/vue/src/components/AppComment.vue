<template>
  <div class="comment box is-clearfix">
    <h2>评论</h2>
    <ul>
      <li v-for="(comment, index) in comments">
        <div class="comment-header">
          <span class="username">{{ comment.User.username }}</span>
          <span class="publish-date">{{ comment.created_at | time }}</span>
          <span class="comment-footer is-pulled-right">
            <span @click="showComment(index)" v-if="comment.childeren > 0">
              <i class="fas fa-comments small"></i> {{ comment.childeren.length }}
            </span>
            <span>
              <button>回复</button>
            </span>
          </span>
        </div>
        <div class="content comment-content">
          <p v-html="comment.content"></p>
        </div>
        <div class="">

        </div>
        <transition name="fade">
          <div class="child-comments" v-show="showIndex == index">
            <div class="comment" v-for="child in comment.childeren">
              <div class="comment-header">
                <span class="username">{{ child.User.username }}</span>
                <span class="publish-date">{{child.created_at | time}}</span>
              </div>
              <div class="content comment-content">
                <p v-html="child.content"></p>
              </div>
            </div>
            <div v-if="!comment.childeren.length" class="has-text-centered">没有评论</div>
          </div>
        </transition>
      </li>
    </ul>
    <div class="comment-input has-text-centered">
      <button class="button is-small" v-if="!showInput" @click="showInput = !showInput">我要评论</button>
      <transition name="fade">
        <div v-if="showInput">
          <at v-model="content" :members="members">
            <div class="quill-editor" v-model:content="content" v-quill:myQuillEditor="editorOption">
            </div>
          </at>
          <button class="button is-small is-pulled-right" @click="pushComment">提交</button>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { ComponentOptions } from 'vue'
import At from 'vue-at'

const findAuthorNames = (comments) => {
  const authorNames = []
  console.log(comments);
  for(let comment of comments) {
    authorNames.push(comment.User.username)
    if (comment.childeren && comment.childeren.length) {
      authorNames.concat(findAuthorNames(comment.childeren))
    }
  }
  return authorNames
}

@Component({
  name: 'AppComment',
  components: {
    At
  },
  props: ['comments', 'author', 'type']
})
export default class CommentPage extends Vue {
  showIndex = -1
  content = ''
  editorOption = {
    theme: 'bubble',
    placeholder: '请输入评论'
  }
  showInput = false
  showComment(index) {
    if (this.showIndex == index) {
      this.showIndex = -1
      return
    }
    this.showIndex = index
  }
  get members(this: any){
    const membersSet = new Set([this.author.username, ...findAuthorNames(this.comments)])
    return [...membersSet]
  }
  pushComment() {
    this.$emit('push', this.content)
    this.showInput = false
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
  margin: 20px 0;
  .comment {
    margin-left: 20px;
    padding: 10px;
    background: #f7f7f7;
  }
}

.comment ul {
  margin-bottom: 20px;

  li {
    margin-bottom: 10px;
  }
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
