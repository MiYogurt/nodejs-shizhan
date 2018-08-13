import { findTitle } from './';
function getTitle (vm) {
  const title = findTitle(vm)
  if (title) {
    return typeof title === 'function'
      ? title.call(vm)
      : title
  }
}

const serverTitleMixin = {
  created () {
    const title = getTitle(this)
    if (title) {
      this.$ssrContext.title = `App | ${title}`
    }
  }
}

const clientTitleMixin = {
  mounted () {
    const title = getTitle(this)
    if (title) {
      document.title = `App | ${title}`
    }
  }
}

export default isServer
  ? serverTitleMixin
  : clientTitleMixin