'use strict'

const R = require('ramda')

module.exports = {
  where(obj, ...args) {
    return Object.assign(
      {
        where: obj
      },
      ...args
    )
  },
  throw(code, field, message) {
    this.ctx.status = code
    throw [{ field, message }]
  },
  range(start, end) {
    const _range = function* name(start, end) {
      let index = start
      if (typeof end === 'undefined') {
        end = start
        index = 0
      }
      while (index < end) {
        yield index++
      }
    }
    return Array.from(_range(start, end))
  }
}
