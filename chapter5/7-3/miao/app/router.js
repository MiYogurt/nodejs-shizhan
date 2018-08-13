'use strict'

const init = require('./util').initRouterMap
const mount = require('./util').mountPassportToController
const install = require('./util').installPassport
const {
  getModelCount: countRouter,
  getModelConfig: adminRouter
} = require('./util')

const auth = require('koa-basic-auth')

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  router.get('/', controller.home.index)
  router.get('/email/forget_password', controller.user.forgetPasswordG)
  router.post('/email/forget_password', controller.user.forgetPasswordP)
  router.get('/email/verify', controller.user.emailVerify)

  router.get('/alipay/pay/:month', controller.pay.index)
  router.post('/alipay/callback', controller.pay.alipay) // 异步回调接口
  router.get('/alipay/success', controller.pay.success) // 同步授权接口

  router.resources('images', '/images', controller.image)

  router.resources('all', '/model/:model', controller.all)

  router.get(
    '/api/v1/admin_table',
    auth({
      name: 'dd',
      pass: '888888'
    }),
    adminRouter
  )

  router.get(
    '/admin',
    auth({
      name: 'dd',
      pass: '888888'
    }),
    ctx => ctx.render('admin')
  )

  router.get(
    '/api/v1/admin_count',
    auth({
      name: 'dd',
      pass: '888888'
    }),
    countRouter
  )
  router.get(
    '/api/v1/jsonp',
    app.jsonp(),
    (ctx, next) => {
      if (ctx.query.username !== 'dd' && ctx.query.password !== '888888') {
        return ctx.throw(403)
      }
      return next()
    },
    ctx => (ctx.body = { name: '123' })
  )
  router.resources(
    'admin',
    '/api/v1/admin/:model',
    auth({ name: 'dd', pass: '888888' }),
    controller.admin
  )

  // app.passport.mount('github')

  // app.all('/token', app.oAuth2Server.token(), ctx => ctx.state.oauth.token) // 获取 accesss_token
  // app.all('/authorize', app.oAuth2Server.authorize()) // 获取授权码
  // app.all(
  //   '/authenticate',
  //   app.oAuth2Server.authenticate({
  //     scope: 'r_image'
  //   }),
  //   ctx => {
  //     ctx.body = ctx.state.oauth
  //   }
  // )

  // // 往控制器上面注册 passport 中间件
  // controller.passport = {}
  // controller.passport.local = app.passport.authenticate('local')
  install(app.passport, require('./passport'))
  mount(['local', 'github'], app.passport, controller)

  router.get('/passport/github', controller.passport.github)
  router.get('/passport/github/callback', controller.passport.github)

  init('/api/v1', require('./api')(controller), router)
}
