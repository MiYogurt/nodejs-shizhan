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

// import At from 'vue-at'
// Vue.use(At)

import VueQuillEditor from 'vue-quill-editor'
Vue.use(VueQuillEditor)

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

export default function createApp() {
  Vue.prototype.$api = api

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
