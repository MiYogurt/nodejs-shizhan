import * as merge from 'webpack-merge'
import * as VueSSRClientPlugin from 'vue-server-renderer/client-plugin'
import BaseConfiguration from './base'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import {
  Configuration,
  DefinePlugin,
  HotModuleReplacementPlugin,
  DllReferencePlugin
} from 'webpack'
import { getPath } from './utils'

const isProd = 'prod' === process.env.NODE_ENV

const clientConfiguration = merge(BaseConfiguration, {
  entry: {
    app: getPath('src/entry-client.ts')
  },
  resolve: {
    extensions: [
      '.ts',
      '.tsx',
      '.js',
      '.vue',
      '.json',
      '.styl',
      '.css',
      '.sass',
      '.scss'
    ],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      api: getPath('src/api/v1/client/index.ts')
    }
  },
  externals: ['ramda', 'rxjs'],
  plugins: [
    // new DllReferencePlugin({
    //   context: getPath(''),
    //   manifest: 'manifest.json'
    // }),
    new DefinePlugin({
      isClient: true,
      isServer: false,
      Rx: 'window.Rx',
      R: 'window.R'
    }),
    new VueSSRClientPlugin()
  ]
})

if (isProd) {
  clientConfiguration.plugins.push(new BundleAnalyzerPlugin())
  clientConfiguration.optimization = {
    splitChunks: {
      name: 'common',
      chunks: 'initial',
      minSize: 0
    },
    minimize: true
  }
}

export default clientConfiguration
