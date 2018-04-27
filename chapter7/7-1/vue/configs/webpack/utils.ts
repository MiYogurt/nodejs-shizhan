import { curryN }  from 'ramda'
import { resolve } from 'path'

const getPath = curryN(3, resolve)(__dirname, '../..')

export { getPath }
