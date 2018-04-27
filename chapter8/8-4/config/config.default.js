'use strict'

module.exports = appInfo => {
  const config = (exports = {})

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1520572245305_3741'

  // add your config here
  config.middleware = []

  config.sequelize = {
    host: 'db',
    port: '3306',
    dialect: 'mysql',
    database: 'app',
    username: 'root',
    password: '888888'
  }

  return config
}
