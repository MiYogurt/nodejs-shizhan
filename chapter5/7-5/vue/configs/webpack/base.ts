import { Configuration, ProvidePlugin } from 'webpack'
import * as webpack from 'webpack'
import * as ExtractTextPlugin from 'extract-text-webpack-plugin'
import * as FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin'
import * as TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import { concat } from 'ramda'
import { getPath } from './utils'

const isProd = 'prod' === process.env.NODE_ENV

const commonPlugins = [
  new webpack.DefinePlugin({
    URL: 'http://localhost:7001/api/v1'
  })
  // new ProvidePlugin({
  //   R: ['ramda/dist/ramda.js'],
  //   Rx: ['rxjs']
  // })
]
const concatCommon = concat(commonPlugins)

const prodPlugins = concatCommon([
  new ExtractTextPlugin({
    filename: 'common.[hash].css'
  })
])

// const devPlugins = concatCommon([new FriendlyErrorsWebpackPlugin()])
const devPlugins = concatCommon([])

const babelrc = {
  presets: [
    [
      'vue-app',
      {
        useBuiltIns: true
      }
    ],
    'env'
  ],
  plugins: [
    [
      'ramda',
      {
        useES: true
      }
    ]
  ]
}

const publicPath = '/dist/'

const BaseConfiguration: Configuration = {
  devtool: isProd ? false : 'inline-source-map',
  mode: isProd ? 'production' : 'development',
  output: {
    path: getPath('dist'),
    chunkFilename: '[name].[hash].bundle.js',
    filename: '[name].[hash].js',
    publicPath: '/dist/'
  },
  resolve: {
    alias: {
      public: getPath('public'),
      vue$: 'vue/dist/vue.esm.js'
    },
    extensions: ['.ts', '.tsx', '.js', '.vue', '.json'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: getPath('.'),
        logLevel: 'info',
        extensions: ['.ts', '.tsx', 'vue', 'sass']
      })
    ]
  },
  plugins: isProd ? prodPlugins : devPlugins,
  performance: {
    maxEntrypointSize: 300000,
    hints: isProd ? 'warning' : false
  },
  module: {
    unknownContextCritical: false,
    // noParse: /es6-promise/,
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          extractCSS: isProd,
          loaders: {
            scss: 'vue-style-loader!css-loader!sass-loader',
            // sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax!sass-resources-loader?resources=' + getPath('src/_vars.sass'),
            sass: [
              'vue-style-loader',
              'css-loader',
              {
                loader: 'sass-loader',
                options: {
                  indentedSyntax: true
                }
              },
              {
                loader: 'sass-resources-loader',
                options: {
                  resources: [
                    getPath('src/sass/_vars.sass'),
                    getPath('src/sass/_func.sass')
                  ]
                }
              }
            ],
            styl: 'vue-style-loader!css-loader!stylus-loader'
          }
        }
      },
      { test: /\.styl$/, loader: 'vue-style-loader!css-loader!stylus-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      {
        test: /\.jsx?$/,
        // exclude: /node_modules/,
        use: [{ loader: 'babel-loader', options: babelrc }]
      },
      {
        test: /\.sass$/,
        loader:
          'vue-style-loader!css-loader!sass-loader!sass-resources-loader?resources=' +
          getPath('src/sass/_vars.sass') +
          '&resources=' +
          getPath('src/sass/_func.sass')
      },
      { test: /\.pug$/, loader: 'pug-loader', options: { doctype: 'html' } },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: { appendTsSuffixTo: [/\.vue$/] }
      },
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader', options: babelrc }, 'ts-loader']
      },
      {
        test: /\.(png|jpg|gif|svg|ttf|woff|eot)$/,
        loader: 'file-loader',
        options: { name: '[name].[ext]?[hash]' }
      }
    ]
  }
}

export default BaseConfiguration
