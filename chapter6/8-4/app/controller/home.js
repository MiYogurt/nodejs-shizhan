'use strict'

const Controller = require('egg').Controller
const os = require('os')

class HomeController extends Controller {
  async index() {
    this.ctx.body =
      'hi, egg ' + os.hostname() + JSON.stringify(os.networkInterfaces())
  }
}

module.exports = HomeController
