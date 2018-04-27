'use strict'
const { forEachObjIndexed } = require('ramda')

function initRouterMap(prefix, maps, router) {
  forEachObjIndexed((map, method) => {
    forEachObjIndexed((controller, url) => {
      if (process.env.NODE_ENV && process.env.NODE_ENV !== 'production') {
        const chalk = require('chalk')
        console.log(
          `${chalk.blue('[' + method + ']')} -> ${chalk.red(prefix + url)}`
        )
      }

      router[method](prefix + url, controller)
    }, map)
  }, maps)
}

module.exports = {
  initRouterMap
}
