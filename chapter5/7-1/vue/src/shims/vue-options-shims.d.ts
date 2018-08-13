import Vue from 'vue'
import { Store } from 'vuex'
import { State } from '../store'
import { Route } from 'vue-router'

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    style?: any;
    asyncData?(context?: { route?: Route; store?: Store<State> }): any
  }
}
