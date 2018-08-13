'use strict'

const Controller = require('egg').Controller

class BaseController extends Controller {
  ok(ok) {
    if (ok) {
      return (this.ctx.body = 'success')
    }
    return (this.ctx.body = 'failue')
  }
}

module.exports = BaseController
