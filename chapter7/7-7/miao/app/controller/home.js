'use strict'

class HomeController extends Controller {
  async index() {
    // return this.ctx.render('user/login.njk', { query: this.ctx.querystring })
    this.ctx.body = this.ctx.state
  }
}

module.exports = HomeController
