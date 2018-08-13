import { Module } from 'vuex'
import Vue from 'Vue'
import { State as RootState } from '../..'

export class State {
  ImageComments = []
  User = {}
  description = ''
  id = 0
  list_url = ''
  main_url = ''
  user_id = 0
  view_id = 0
  updated_at = ''
  created_at = ''
}

const imageFolder = 'http://localhost:7001/public/download/'

const concatImageFolder = imageName =>
  imageFolder + imageName + ',1920,1080.jpg'

const Image: Module<State, RootState> = {
  namespaced: true,
  state: new State(),
  getters: {
    main(state: any) {
      return concatImageFolder(state.main_url)
    },
    list(state: any) {
      if (!state.list_url.length) {
        return []
      }
      return state.list_url.split(',').map(concatImageFolder)
    }
  },
  mutations: {
    SET_IMAGE(state, payload) {
      Object.assign(state, payload)
    },
    PUSH_COMMENT(state: any, payload) {
      state.ImageComments.push(payload)
    }
  },
  actions: {}
}

export default Image
