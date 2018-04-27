'use strict'
/**
 ** 用户控制器
 * @class User
 * @extends {C} Egg.Controller
 */
class User extends C {
  /**
   * @description 登陆
   * @memberof User
   */
  async signIn() {
    this.ctx.verify('user.signin', 'body')
    this.ctx.body = '登陆'
  }
  /**
   * @description 注册
   * @memberof User
   */
  async signUp() {
    await this.ctx.verify('user.signup', 'body')
    // const json = await this.ctx.service.user.signUp()
    // this.ctx.body = json
    this.ctx.body = '注册'
  }
}

module.exports = User
