'use strict'

const All = require('./all')
const R = require('ramda')

class Admin extends All {
  omit() {}

  normarlize(data) {
    const { ctx } = this
    ctx.app.model.showAllSchemas().then(console.dir)
    // console.log('schame')
    // console.dir(ctx.app.model.User.schema())
    ctx.type = 'json'
    // ctx.body = {
    //   data,
    //   model: Object.keys(this.ctx.model.models)
    // }
    ctx.body = data
  }

  /**
   * get list
   * @param {object} ctx Context
   */
  async index({ query }) {
    R.mapObjIndexed((val, key) => {
      try {
        if (parseInt(val)) {
          query[key] = parseInt(val)
        }
      } catch (e) {
        return
      }
    }, query)
    const data = await this.model.findAll(query)
    this.normarlize(data)
  }
}

module.exports = Admin
