interface NodeModule {
  hot: boolean
}

declare module '*.pug' {
  const Module: any
  export = Module
}

declare module '*' {
  const Module: any
  export default Module
}

declare var isServer: boolean
declare var isClient: boolean

