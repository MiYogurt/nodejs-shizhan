import { CreateElement } from 'vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class HelloJSX extends Vue {
  public name: string = "hello"
  public initialEnthusiasm: number = 1

  public enthusiasm = this.initialEnthusiasm

  public increment() {
    this.enthusiasm++
  }
  public decrement() {
    if (1 < this.enthusiasm) {
      this.enthusiasm--
    }
  }
  public async asyncData(){
    console.log("async Data")
  }
  public title () {
    return 'Cool';
  }
  public get exclamationMarks(): string {
    return Array.from({ length: this.enthusiasm + 1 }).join('!')
  }

  public render(h: CreateElement) {
    return (
      <div>
        <div className="greeting">
          Hello {this.name} {this.exclamationMarks}
        </div>
        <button onClick={this.decrement}>-</button>
        <button onClick={this.increment}>+</button>
      </div>
    )
  }
}
