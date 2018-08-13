'use strict'

module.exports = ctl => ({
  post: {
    '/signup': ctl.user.signUp, // 注册
    '/signin': ctl.user.signIn // 登录
  }
})
