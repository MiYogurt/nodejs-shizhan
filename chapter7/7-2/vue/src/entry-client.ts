import 'es6-promise'
import ProgressBar from './components/ProgressBar.vue'
import { findAsyncDataFunction } from './utils'
import Vue from 'vue'
import createApp from './app'

// global progress bar
const bar: any = (Vue.prototype.$bar = new Vue(ProgressBar).$mount())
document.body.appendChild(bar.$el)

const finish = next => () => {
  bar.finish()
  return next()
}

const fail = next => () => {
  bar.fail()
  return next()
}

Vue.mixin({
  beforeRouteUpdate(to, from, next) {
    const asyncData = findAsyncDataFunction(this)
    // console.log(this) // find asyncData
    if (asyncData) {
      bar.start()
      asyncData({
        store: this.$store,
        route: to
      })
        .then(finish(next))
        .catch(fail(next))
    } else {
      next()
    }
  }
})

const { app, router, store } = createApp()

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = prevMatched[i] !== c)
    })
    // console.log(matched)
    const asyncDataHooks = activated.map(findAsyncDataFunction).filter(_ => _)
    if (!asyncDataHooks.length) {
      return next()
    }
    bar.start()
    Promise.all(asyncDataHooks.map(hook => hook({ store, route: to })))
      .then(finish(next))
      .catch(fail(next))
  })

  app.$mount('#app')
})
