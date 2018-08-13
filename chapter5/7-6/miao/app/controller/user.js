'use strict'
const R = require('ramda')

/**
 ** 用户控制器
 * @class User
 * @extends {C} Egg.Controller
 */
class User extends C {
  /**
   * ! 废弃
   * @description 登陆
   * @deprecated
   * @memberof User
   */
  async signIn() {
    this.ctx.verify('user.signin', 'body')
    this.ctx.body = await this.service.user.signIn()
  }

  signUpTemplate(user, token) {
    return (
      '<a href="' +
      this.ctx.origin +
      '/email/verify?user_id=' +
      user.id +
      '&t=' +
      token +
      '">点我验证邮件</a>'
    )
  }
  /**
   * @description 注册
   * @member User
   */
  async signUp() {
    const { ctx } = this
    await ctx.verify('user.signup', 'body')
    const { user } = await ctx.service.user.signUp()
    const ok = await this.ctx.service.user.sendVerifyEmail(
      '激活邮箱',
      user,
      this.signUpTemplate.bind(this)
    )
    this.ok(ok)
  }
  /**
   * 激活验证
   * @return {void}
   */
  async emailVerify() {
    await this.ctx.verify('user.emailVerify', 'query')
    const ok = await this.ctx.service.user.verifyToken(
      this.ctx.request.query.user_id,
      this.ctx.request.query.t
    )
    return this.ok(ok)
  }
  emailSendTemplate(user, token) {
    return (
      '<a href="' +
      this.ctx.origin +
      '/email/forget_password?user_id=' +
      user.id +
      '&t=' +
      token +
      '">点我验证邮件</a>'
    )
  }
  /**
   * 发送忘记邮件
   * @return {void}
   */
  async emailSend() {
    await this.ctx.verify('user.emailSend', 'body')
    const ok = await this.ctx.service.user.sendVerifyEmail(
      '找回密码',
      this.ctx.request.body.email,
      this.emailSendTemplate.bind(this)
    )
    return this.ok(ok)
  }
  /**
   * 忘记密码表单
   * @return {void}
   */
  async forgetPasswordG() {
    return this.ctx.render('user/forget_password.njk')
  }
  /**
   * 忘记密码 POST 验证
   * @return {void}
   */
  async forgetPasswordP() {
    const { ctx } = this
    const fields = Object.assign({}, ctx.request.query, ctx.request.body)
    await ctx.verify('user.forgetPassword', fields)
    const ok = await ctx.service.user.verifyToken(fields.user_id, fields.t)
    if (ok) {
      const user = await ctx.model.User.findById(fields.user_id)
      user.password = fields.password
      await user.save()
      return ctx.render('user/success.njk')
    }
    return ctx.render('user/failure.njk')
  }
}

module.exports = User
