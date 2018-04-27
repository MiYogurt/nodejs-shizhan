'use strict'

const All = require('./all')

class Admin extends All {
  omit() {}

  normarlize(data) {
    const { ctx } = this
    ctx.type = 'json'
    ctx.body = {
      data,
      model: Object.keys(this.ctx.model.models)
    }
  }
}

module.exports = Admin
