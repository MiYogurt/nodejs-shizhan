'use strict'

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
    password: ''
  }
  config.flash = {
    key: Symbol.for('flash')
  }

  config.security = {
    csrf: {
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
      ctx.type = 'json'
      ctx.status = 400
      ctx.body = error
    }
  }
  return config
}
