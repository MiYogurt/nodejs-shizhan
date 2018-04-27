import { Module } from 'vuex'
import Vue from 'Vue'
import { State as RootState } from '../..'

import { propLens, over, set } from '../../../shims/vuex-lens'
const imagesLen = propLens('images')

export class State {
  images: any[] = []
  all = 1
  page = 1
}

const Index: Module<State, RootState> = {
  namespaced: true,
  state: new State(),
  mutations: {
    PUSH_IMAGES: (state, payload) => {
      over(imagesLen, (images: any) => R.concat(images, payload), state)
    },
    SET_IMAGES: (state, payload) => {
      set(imagesLen, payload, state)
    },
    ALL_PAGE: (state, payload) => {
      state.all = parseInt(payload)
    },
    PAGE: (state, payload) => {
      state.page = parseInt(payload)
    }
  },
  actions: {
    setImages({ commit }, images) {
      commit('SET_IMAGES', images.data)
      commit('ALL_PAGE', images.allPage)
      commit('PAGE', images.currentPage)
    },
    pushImages({ commit }, images) {
      commit('PUSH_IMAGES', images.data)
      commit('ALL_PAGE', images.allPage)
      commit('PAGE', images.currentPage)
    }
  }
}

export default Index
