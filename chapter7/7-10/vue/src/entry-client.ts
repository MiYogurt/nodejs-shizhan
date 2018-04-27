import 'es6-promise'
import ProgressBar from './components/ProgressBar.vue'
import api from './api/v1'
import { findAsyncDataFunction } from './utils'
import Vue from 'vue'
import createApp from './app'

import * as localforage from 'localforage'

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
    bar.start()
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to,
        api
      })
        .then(finish(next))
        .catch(fail(next))
    } else {
      finish(next)()
    }
  }
})

const { app, router, store } = createApp()

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

localforage.getItem('user_token').then(token => {
  if (token && !store.state.user_token) {
    store.commit('USER_TOKEN', token)
    api
      .getUser(token)
      .then(user_info => store.commit('USER_INFO', user_info.data.user))
      .catch(console.error)
  }
})

router.onReady(() => {
  router.beforeEach((to, from, next) => {
    if (to.fullPath.includes('/me')) {
      if (store.state.user_token) {
        console.log(store.state.user_token)
      } else {
        console.log('no token')
        next('/')
      }
    }
    next()
  })
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = prevMatched[i] !== c)
    })
    // console.log(matched)
    bar.start()
    const asyncDataHooks = activated.map(findAsyncDataFunction).filter(_ => _)
    if (!asyncDataHooks.length) {
      bar.finish()
      return next()
    }
    Promise.all(asyncDataHooks.map(hook => hook({ store, route: to, api })))
      .then(finish(next))
      .catch(fail(next))
  })

  app.$mount('#app')
})
