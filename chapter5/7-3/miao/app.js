'use strict'

const { globalBaseInitial, globalLogger } = require('./init')

globalBaseInitial(__dirname)

module.exports = async app => {
  // console.log(app.model.models)
  // Object.keys(app.model.models).forEach(value => {
  //   console.log(JSON.stringify(app.model.models[value].tableAttributes))
  //   console.log('======== \n')
  // })
  globalLogger(app)
}
