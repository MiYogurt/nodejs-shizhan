'use strict'
const { forEachObjIndexed, forEach } = require('ramda')
const chalk = require('chalk')
function initRouterMap(prefix, maps, router) {
  forEachObjIndexed((map, method) => {
    forEachObjIndexed((controller, url) => {
      // if (DEV) {
      //   console.log(
      //     `${chalk.blue('[' + method + ']')} -> ${chalk.red(prefix + url)}`
      //   )
      // }
      info('[%s] -> %s', method, chalk.red(prefix + url))
      router[method](prefix + url, controller)
    }, map)
  }, maps)
}

function mountPassportToController(keys, passport, controller) {
  if (!controller.passport) {
    controller.passport = {}
  }
  forEach(value => {
    // if (DEV) {
    //   console.log(`${chalk.blue('[ mount passport ]')} ${chalk.red(value)}`)
    // }
    info('[passport] -> %s', chalk.red('controller.passport.' + value))
    controller.passport[value] = passport.authenticate(value, {
      session: false,
      successRedirect: undefined
      // @see https://github.com/eggjs/egg-passport/blob/0afce5b0d5fbc107730e10dad6aff915c03cf079/lib/passport.js#L41
    })
  }, keys)
}

function installPassport(passport, { verify }) {
  passport.verify(verify)
}

module.exports = {
  initRouterMap,
  mountPassportToController,
  installPassport
}
