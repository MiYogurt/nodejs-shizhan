import * as fs from 'fs'
import * as path from 'path'
import * as webpack from 'webpack'
import * as chokidar from 'chokidar'
import clientConfig from './webpack/client'
import serverConfig from './webpack/server'

const MFS = require('memory-fs')

/* tslint:disable */
const readFile = (fs: any, file: string) => {
  try {
    return fs.readFileSync(path.join(clientConfig.output.path, file), 'utf-8')
  } catch (e) {}
}

export default function parcel(app: any, templatePath: any, cb: Function) {
  let bundle: any
  let template: any
  let clientManifest: any

  let ready: Function
  let reject: Function
  const readyPromise = new Promise((r: Function, reject: Function) => {
    ready = r
    reject = reject
  })
  const update = () => {
    if (bundle && clientManifest) {
      ready()
      cb(bundle, {
        template,
        clientManifest
      })
    }
  }

  // read template from disk and watch
  template = fs.readFileSync(templatePath, 'utf-8')
  chokidar.watch(templatePath).on('change', () => {
    template = fs.readFileSync(templatePath, 'utf-8')
    console.log('index.html template updated.')
    update()
  })

  // modify client config to work with hot middleware
  clientConfig.entry['app'] = [
    'webpack-hot-middleware/client',
    clientConfig.entry['app']
  ]
  clientConfig.output.filename = '[name].js'
  clientConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )

  // dev middleware
  const clientCompiler = webpack(clientConfig)
  const devMiddleware = require('webpack-dev-middleware')(clientCompiler, {
    publicPath: clientConfig.output.publicPath
  })
  app.use(devMiddleware)
  clientCompiler.plugin('done', stats => {
    stats = stats.toJson()
    stats.errors.forEach(err => console.error(err))
    stats.warnings.forEach(err => console.error(err))
    if (stats.errors.length) return
    clientManifest = JSON.parse(
      readFile(devMiddleware.fileSystem, 'vue-ssr-client-manifest.json')
    )
    update()
  })

  // hot middleware
  app.use(
    require('webpack-hot-middleware')(clientCompiler, {
      heartbeat: 5000
    })
  )

  // watch and update server renderer
  const serverCompiler = webpack(serverConfig)
  const mfs = new MFS()
  serverCompiler.outputFileSystem = mfs
  serverCompiler.watch({}, (err, stats: any) => {
    if (err) throw err
    stats = stats.toJson()
    if (stats.errors.length) return

    bundle = JSON.parse(readFile(mfs, 'vue-ssr-server-bundle.json'))
    update()
  })

  return readyPromise
}
