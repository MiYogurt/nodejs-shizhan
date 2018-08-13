<template>
  <div class="box">
    <div class="columns is-multiline">
      <div v-for="image in images" class="column is-6">
        <the-image :image="image" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { ComponentOptions } from 'vue'
import TheImage from '@C/TheImage.vue'
import { State } from 'vuex-class'
import * as localforage from 'localforage'

@Component({
  name: 'MeIndex',
  components: {
    TheImage
  }
})
export default class MeIndex extends Vue {
  images = []
  @State('user_token') user_token
  async mounted(this: any) {
    const token = await localforage.getItem('user_token')
    if (!token) {
      this.$router.push('/signin')
      return
    }
    const { data } = await this.$api.getAllImageForMe(token)
    this.images = data
  }
}
</script>

<style lang="sass" scoped>
</style>
