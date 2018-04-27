'use strict'

const R = require('ramda')

const func = R.curry((a, b, c) => [a, b, c])
console.log(func(1, 2, 3))
console.log(func(1)(2)(3))
console.log(func(R.__, 2)(3, 1))

function curry(fn) {
  const lenth = fn.lenth
  let args = []
  return (...arg) => {
    args = args.concat(arg)
    if (args.length === lenth) {
      return fn(...args)
    }
  }
}

const func2 = curry((a, b, c) => [a, b, c])

console.log(func(1, 2, 3))
console.log(func(1)(2)(3))

const check = (obj, key) => {
  if (typeof obj[key] === 'undefined') {
    return false
  }
  return true
}

// const checkGlobal = key => check(global, key)

// a(b(c(d(e(f(g(1)))))))

const compose = (...fns) => (...args) =>
  fns.reduceRight((acc, val) => val(acc), fns[fns.length - 1](...args))

const composeTwoArgs = (a, b) => x => a(b(x))

const checkCurry = R.curry(check)

const fn = compose(R.not, checkCurry(global))

console.log(fn('use'))
console.log(global.use)

console.log(R.last([1, 2, 3]))
