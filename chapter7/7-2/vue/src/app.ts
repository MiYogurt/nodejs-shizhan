//
// ─── IMPORT COMPONENTS ──────────────────────────────────────────────────────────
//
import './utils/import'
import Vue from 'vue'
import App from './app.vue'
import './app.sass'

//
// ──────────────────────────────────────────────────── END IMPORT COMPONENTS ─────
//

import createStore from './store'
import createRouter from './router'
import { sync } from 'vuex-router-sync'

//
// ─── RX INSTALL ─────────────────────────────────────────────────────────────────
//

import * as VueRx from 'vue-rx'

Vue.use(VueRx, Rx)

//
// ─────────────────────────────────────────────────────────── END RX INSTALL ─────
//

import titleMixin from './utils/title'

Vue.mixin(titleMixin)


export default function createApp() {
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
