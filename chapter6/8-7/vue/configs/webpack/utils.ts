import { curryN } from 'ramda'
import { resolve } from 'path'

const getPath: (path: string) => string = curryN(3, resolve)(__dirname, '../..')

export { getPath }
