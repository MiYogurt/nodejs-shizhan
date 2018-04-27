import * as compile from './Rx.pug'
import { CreateElement, ComponentOptions } from 'vue'
import { Vue, Component, Prop } from 'vue-property-decorator'
// import './Rx.styl';

@Component<Vue>({
  name: 'RxC',
  style: require('./Rx.styl').toString(),
  template: compile(),
  subscriptions(this: RxC) {
    const up$ = this.up$.map(R.always(1))
    const down$ = this.down$.map(R.always(-1))
    const count$ = Rx.Observable.merge(up$, down$)
      .startWith(0)
      .scan(R.add)
    return {
      count: count$
    }
  },
})
export default class RxC extends Vue {
  down$ = new Rx.Subject<any>()
  up$ = new Rx.Subject<any>()
  asyncData(){
    console.log("async Data")
  }

}

