'use strict'

const nullC = async ctx => (ctx.body = '')

module.exports = ctl => ({
  post: {
    '/signup': ctl.user.signUp, // 注册
    '/signin': ctl.passport.local, // 登录
    '/email/send': ctl.user.emailSend
  },
  get: {
    '/': ctx => (ctx.body = ctx.state)
  }
})
