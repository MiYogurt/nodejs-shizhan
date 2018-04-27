import { Store } from 'vuex'
import Vue , { Component } from 'vue';
import * as RxAll from 'rxjs';

declare global {
  interface Window {
    readonly __INITIAL_STATE__: any
  }
  interface NodeRequire {
    ensure: (...args: any[]) => any;
  }
  var _import: (...args: any[]) => any
  var Rx : typeof RxAll
}
