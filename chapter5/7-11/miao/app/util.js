'use strict'
const {
  forEachObjIndexed,
  forEach,
  keys,
  values,
  pipe,
  map,
  zipObj
} = require('ramda')

const R = require('ramda')
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

function mapToInputType(type) {
  const _maps = {
    integer: 'number',
    string: 'text',
    text: 'textarea',
    date: 'datetime'
  }
  return _maps[type] || type
}

async function getModelCount(ctx) {
  // * v1
  // const count = {}
  // forEachObjIndexed(async (model, modelName) => {
  //   count[modelName] = await model.count()
  // }, ctx.app.model.models)
  // * v2
  // const models = ctx.app.model.models
  // const names = keys(models)
  // const toCountPromises = map(m => m.count(), values(models))
  // const _values = await Promise.all(toCountPromises)
  // ctx.body = zipObj(names, _values)
  // * v3
  const models = ctx.app.model.models
  const getValuePromises = R.pipe(R.values, R.map(R.invoker(0, 'count')))
  const names = keys(models)
  const values = await Promise.all(getValuePromises(models))
  ctx.body = R.zipObj(names, values)
}

function getModelConfig(ctx) {
  const config = {}
  forEachObjIndexed((model, modelName) => {
    config[modelName] = {}
    forEachObjIndexed((attr, attrName) => {
      config[modelName][attrName] = mapToInputType(attr.type.key.toLowerCase())
    }, model.tableAttributes)
  }, ctx.app.model.models)
  ctx.body = config
  // ! 未优化的方法
  // ctx.body = Object.keys(ctx.app.model.models).reduce((acc, modelName) => {
  //   const currentModel = ctx.app.model.models[modelName]
  //   const currentModelAttrs = currentModel.tableAttributes
  //   const modelValue = Object.keys(currentModelAttrs).reduce((acc, attr) => {
  //     const currentModelAttrInstance = currentModel.tableAttributes[attr]
  //     const type = currentModelAttrInstance.type.key.toLowerCase()
  //     acc[attr] = mapToInputType(type)
  //     return acc //* 将复杂的对象转化为 { image_name: string }
  //   }, {})
  //   acc[modelName] = modelValue
  //   return acc
  // }, {})
}

module.exports = {
  initRouterMap,
  mountPassportToController,
  installPassport,
  getModelConfig,
  getModelCount
}

