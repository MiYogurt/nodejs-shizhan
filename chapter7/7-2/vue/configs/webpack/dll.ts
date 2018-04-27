import { getPath } from './utils'
import {
  Configuration,
  HotModuleReplacementPlugin,
  DefinePlugin,
  DllPlugin
} from 'webpack'

const isProd = 'prod' === process.env.NODE_ENV
console.log(isProd)
// 未成功 -> errors: libs not found
const DllConfiguration: Configuration = {
  mode: isProd ? 'production' : 'development',
  output: {
    path: getPath('dist'),
    filename: '[name].js',
    library: '[name]'
  },
  entry: {
    libs: [
      'vue',
      'vue-router',
      'vue-rx',
      'vuex',
      'reflect-metadata',
      'es6-promise'
    ]
  },
  plugins: [
    new DllPlugin({
      context: getPath(''),
      path: 'manifest.json',
      name: '[name]'
    })
  ]
}

export default DllConfiguration
