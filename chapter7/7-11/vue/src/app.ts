//
// ─── IMPORT COMPONENTS ──────────────────────────────────────────────────────────
//
import Vue from 'vue'
import App from './app.vue'
import './app.sass'

if (isClient) {
  require('./plugins')
}

if (isServer) {
  const jsdom = require('jsdom')
  const dom = new jsdom.JSDOM('')
  ;(global as any).window = dom.window
  ;(global as any).document = dom.window.document
  ;(global as any).Node = dom.window.Node
  ;(global as any).navigator = dom.window.navigator
}

// import VueQuillEditor from 'vue-quill-editor'
// Vue.use(VueQuillEditor)

//
// ──────────────────────────────────────────────────── END IMPORT COMPONENTS ─────
//

import createStore from './store'
import createRouter from './router'
import { sync } from 'vuex-router-sync'

//
// ─────────────────────────────────────────────────────────── END RX INSTALL ─────
//

import titleMixin from './utils/title'

Vue.mixin(titleMixin)

import api from './api/v1'

import { Duration, DateTime, Interval } from 'luxon'

export default function createApp() {
  Vue.prototype.$api = api
  Vue.filter('time', function(value) {
    if (!value) return ''
    const start = DateTime.fromISO(value, { locale: 'zh-CN' })
    const i = Interval.fromDateTimes(start, DateTime.local())

    const zhCN = [' 年前', ' 月前', ' 天前', ' 小时前', ' 分钟前', ' 秒前']
    const values = [
      'years',
      'months',
      'days',
      'hours',
      'minutes',
      'seconds'
    ].map(v => Math.floor(i.length(v)))
    const index = values.findIndex(v => v > 0)
    return values[index] + zhCN[index] || '刚刚'
  })

  const store = createStore()
  const router = createRouter()

  sync(store, router)
  const app = new Vue({
    store,
    router,
    render: h => h(App)
  })
  return { store, router, app }
}
