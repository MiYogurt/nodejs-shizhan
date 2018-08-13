// var _import = (id) => new Promise((resolve, reject) => {
//   require.ensure([id], (require) => {
//     resolve(require(id))
//   })
// })

Object.defineProperty(exports, '__esModule', {
  value: true
})

exports.default = id => {
  return new Promise((resolve, reject) => {
    require.ensure([id], require => {
      resolve(require(id))
    })
  })
}
