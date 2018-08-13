'use strict'

const { globalBaseInitial, globalLogger } = require('./init')

globalBaseInitial(__dirname)

module.exports = async app => {
  globalLogger(app)
}
