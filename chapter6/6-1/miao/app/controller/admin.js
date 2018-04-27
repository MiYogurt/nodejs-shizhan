'use strict'

const All = require('./all')

class Admin extends All {
  omit() {}

  normarlize(data) {
    const { ctx } = this
    ctx.app.model.showAllSchemas().then(console.dir)
    console.log('schame')
    console.dir(ctx.app.model.User.schema())
    ctx.type = 'json'
    // ctx.body = {
    //   data,
    //   model: Object.keys(this.ctx.model.models)
    // }
    ctx.body = data
  }
}

module.exports = Admin
