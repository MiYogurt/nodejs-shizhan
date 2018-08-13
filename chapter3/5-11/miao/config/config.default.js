'use strict'
const R = require('ramda')
const chalk = require('chalk')

module.exports = appInfo => {
  const config = (exports = {})

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1517818182019_7714'

  // add your config here
  config.middleware = []
  config.sequelize = {
    dialect: 'mysql',
    database: 'miao',
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: '',
    operatorsAliases: false
  }
  config.flash = {
    key: Symbol.for('flash')
  }

  config.security = {
    csrf: {
      ignore: () => true,
      ignoreJSON: true
    }
  }

  config.validator = {
    open: 'zh-CN',
    languages: {
      'zh-CN': {
        required: '必须填 %s 字段'
      }
    },
    async formate(ctx, error) {
      console.log(error)
      info('[egg-y-validator] -> %s', JSON.stringify(error, ' '))
      if (Array.isArray(error)) throw new Error(error[0].message)
      throw error
    }
  }

  config.onerror = {
    html(err, ctx) {
      info('[HTML ERROR]')
      info(err.message)
      ctx.status = 400
      ctx.body = err.message.toString()
    },
    json(err, ctx) {
      info('[JSON ERROR]')
      info(err.message)
      ctx.status = 400
      ctx.body = err.message.toString()
    }
  }

  config.jwt = {
    secret: '123456',
    enable: true,
    ignore(ctx) {
      return true
      // const regs = [/^\/api\/v1/gi]

      // if (regs.some(reg => reg.test(ctx.path))) {
      //   info('[JWT] -> %s', ctx.path)
      //   return true
      // }

      // const paths = [
      //   '/api/v1/signin',
      //   '/api/v1/signup',
      //   '/api/v1/email/verify',
      //   '/api/v1/email/send',
      //   '/favicon.ico',
      //   '/robots.txt'
      // ]
      // if (DEV) {
      //   const tip = `${chalk.yellow('[ JWT ]')} --> ${
      //     R.contains(ctx.path, paths)
      //       ? chalk.green(ctx.path)
      //       : chalk.red(ctx.path)
      //   }`
      //   console.log(tip)
      // }
      // info(
      //   '[JWT] -> %s',
      //   R.contains(ctx.path, paths)
      //     ? chalk.green(ctx.path)
      //     : chalk.red(ctx.path)
      // )
      // return R.contains(ctx.path, paths)
    }
  }

  config.passportLocal = {
    usernameField: 'email',
    passwordField: 'password'
  }

  config.email = {
    username: '1716857218@qq.com',
    password: 'krqjwpqjvmlabcbb',
    host: 'smtp.qq.com',
    sender: 'bob <1716857218@qq.com>'
  }

  config.redis = {
    client: {
      port: 6379, // Redis port
      host: '127.0.0.1', // Redis host
      password: '',
      db: 0
    }
  }

  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.njk': 'nunjucks'
    }
  }

  config.oAuth2Server = {
    debug: true,
    grants: ['authorization_code', 'refresh_token']
  }

  return config
}
