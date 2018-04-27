<template>
  <div class="box">
    <div id="image-container" ref="container" @dragover.prevent="noop" @drop.prevent="imageDrop">
      <p>将图片拖入选项框中</p>
    </div>

    <div class="list">
      <ul class="columns is-multiline">
        <li v-for="(image, index) in images" class="column is-3 list-item" @click="del(index)">
          <img :src="image">
          <span class="status" v-if="!filesStatus[index]">等待上传</span>
          <span class="status success" v-else>完成上传</span>
        </li>
      </ul>
    </div>

    <h2 class="title is-5 main-index-select-title">主图序号</h2>
    <div class="field">
      <div class="control">
        <div class="select is-black is-rounded">
          <select v-model="mainIndex">
            <option v-for="i in files.length" :key="i" :value="i">{{i}}</option>
          </select>
        </div>
      </div>
    </div>

    <div class="field">
      <div class="control">
        <input class="input is-black" type="text" placeholder="标题" v-model="title">
      </div>
    </div>


    <div class="field">
      <div class="control">
        <input class="input is-black" type="text" placeholder="简介" v-model="description">
      </div>
    </div>
    <button class="button is-black" @click="push">上传图片</button>
    <button class="button is-black" @click="submit">提交数据</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { ComponentOptions } from 'vue'
import { State } from 'vuex-class'
import * as localforage from 'localforage'
import upyun from 'upyun'
const bucket = new upyun.Bucket('yugo-miao')

@Component({
  name: 'MeImageUpload'
})
export default class MeIndex extends Vue {
  files = []
  filesStatus = []
  mainIndex = 0
  description = ''
  title = ''
  get main_url() {
    return this.files[this.mainIndex - 1].name
  }
  get list_url() {
    let filenames = this.files.map(f => f.name)
    filenames.splice(this.mainIndex - 1, 1)
    return filenames.join(',')
  }
  noop() {}
  @State('user_token') user_token
  @State('user_info') user
  get images() {
    return this.files.map(v => URL.createObjectURL(v))
  }
  imageDrop(e) {
    const fileList = e.dataTransfer.files
    Array.from(fileList).forEach(file => this.files.push(file))
  }

  async del(this: any, index) {
    const _del = () => {
      this.files.splice(index, 1)
      this.filesStatus.splice(index, 1)
    }
    if (!this.filesStatus[index]) {
      _del()
      return
    }

    const { data } = await this.$api.deleteFile(
      this.user_token,
      `/user/${this.user.id}/image/${this.files[index].name}`
    )
    if (data) {
      _del()
    }
    console.log(data)
  }

  async mounted(this: any) {
    const token = await localforage.getItem('user_token')
    if (!token) {
      this.$router.push('/signin')
      return
    }
    document.ondragover = e => {
      e.preventDefault()
    }
  }

  get client(this: any) {
    if (this['_client']) {
      return this['_client']
    }
    this['_client'] = new upyun.Client(
      bucket,
      this.$api.getHeaderToken(this.user_token)
    )
    return this['_client']
  }

  async push() {
    for (let index in this.files) {
      const file = this.files[index]
      const ok = await this.client.putFile(
        `/user/${this.user.id}/image/${file.name}`,
        file
      )
      this.filesStatus.splice(index as any, 1, ok)
    }
  }

  async submit(this: any) {
    if (this.filesStatus.some(f => f == false)) {
      return
    }
    const image = await this.$api.createImage(this.user_token, {
      main_url: this.main_url,
      list_url: this.list_url,
      description: this.description,
      title: this.title
    })
    console.log(image)
  }
}
</script>

<style lang="sass" scoped>
.box
  box-shadow: none
#image-container
  width: 100%
  min-height: 200px
  display: flex
  align-items: center
  margin-bottom: 20px
  border: 2px dashed #0a0a0a
  p
    font-size: 1.25rem
    text-align: center
    width: 100%
    color: #0a0a0a
.list-item
  position: relative
  margin-bottom: 20px
  &:hover::before
    position: absolute
    content: '✘'
    font-size: 2rem
    display: flex
    justify-content: center
    align-items: center
    color: #fff
    background: rgba(0,0,0,.4)
    left: 12px
    right: 12px
    bottom: 35px
    top: 12px
    cursor: pointer
.button
  margin: 1rem 0
  margin-left: auto
.list
  margin-bottom: 2rem
.status
  font-size: .7rem
  text-align: center
  display: block
.success
  color: green
.main-index-select-title
  margin: 1rem 0
</style>
