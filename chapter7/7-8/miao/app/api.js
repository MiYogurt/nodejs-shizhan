'use strict'

const nullC = async ctx => (ctx.body = '')

module.exports = ctl => ({
  post: {
    '/signup': ctl.user.signUp, // 注册
    '/signin': ctl.passport.local, // 登录
    '/email/send': ctl.user.emailSend,
    '/comment/img': ctl.comment.image
  },
  get: {
    '/': ctx => (ctx.body = ctx.state),
    '/image': ctl.image.index,
    '/image/:id': ctl.image.show
  }
})
