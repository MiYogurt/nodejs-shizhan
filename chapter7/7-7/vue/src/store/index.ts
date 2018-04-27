import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import index from './modules/index'

Vue.use(Vuex)

export class State {
  user_token = null
  user_info = null
}

const options: StoreOptions<State> = {
  state: new State(),
  mutations: {
    USER_TOKEN(state, payload) {
      state.user_token = payload
    },
    USER_INFO(state, payload) {
      state.user_info = payload
    }
  },
  getters: {},
  actions: {},
  modules: {
    index
  }
}

export default function createStore() {
  return new Vuex.Store(options)
}
