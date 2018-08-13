'use strict'

const path = require('path')
const R = require('ramda')

const check = R.curry((obj, key) => {
  if (typeof obj[key] === 'undefined') {
    return false
  }
  return true
})

const notInGlobal = key => !check(global)(key)
// const notInGlobal = !check(global)  // 不等于
// const notInGlobal = R.not(check(global))
// const notInGlobal = R.compose(R.not, check(global))
// const notInGlobal = R.pipe(check(global), R.not)

function globalBaseInitial(baseDir) {
  const _use = dir => require(path.resolve(baseDir, dir))

  if (notInGlobal('check')) {
    global.check = check
  }

  if (notInGlobal('DEV')) {
    global.DEV = process.env.NODE_ENV !== 'production'
  }

  if (notInGlobal('Controller')) {
    global.C = global.Controller = _use('app/controller/base')
  }

  if (notInGlobal('Service')) {
    global.S = global.Service = require('egg').Service
  }

  if (notInGlobal('use')) {
    global.use = dir => {
      dir = dir.replace(/\./g, path.sep)
      return _use(dir)
    }
  }
}

function globalLogger(app) {
  if (DEV) {
    global.debug = app.logger.debug.bind(app.logger)
    global.info = app.logger.info.bind(app.logger)
  } else {
    global.info = () => { }
    global.debug = () => { }
  }
}

module.exports = {
  globalBaseInitial,
  globalLogger
}
