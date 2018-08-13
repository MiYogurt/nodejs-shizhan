var _import = (id) => new Promise((resolve, reject) => {
  require.ensure([id], (require) => {
    resolve(require(id))
  })
})