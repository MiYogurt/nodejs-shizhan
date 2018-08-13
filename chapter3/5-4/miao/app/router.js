'use strict'

const init = require('./util').initRouterMap

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  router.get('/', controller.home.index)
  init('/api/v1', require('./api')(controller), router)
}
