'use strict'

const init = require('./util').initRouterMap
const mount = require('./util').mountPassportToController
const install = require('./util').installPassport

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  router.get('/', controller.home.index)
  router.get('/email/forget_password', controller.user.forgetPasswordG)
  router.post('/email/forget_password', controller.user.forgetPasswordP)
  router.get('/email/verify', controller.user.emailVerify)
  // // 往控制器上面注册 passport 中间件
  // controller.passport = {}
  // controller.passport.local = app.passport.authenticate('local')
  install(app.passport, require('./passport'))
  mount(['local'], app.passport, controller)
  init('/api/v1', require('./api')(controller), router)
}
