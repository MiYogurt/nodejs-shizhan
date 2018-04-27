import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import index from './modules/index'

Vue.use(Vuex)

export class State {
  name = 'yugo'
  age = '33'
}

const options: StoreOptions<State> = {
  state: new State(),
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    index
  }
}

export default function createStore() {
  return new Vuex.Store(options)
}
