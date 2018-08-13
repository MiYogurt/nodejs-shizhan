import * as fs from 'fs'
import * as path from 'path'
import * as express from 'express'
import * as LRU from 'lru-cache'
import waitParcel from './configs/wait-parcel'
require('source-map-support').install()
const favicon = require('serve-favicon')
const compression = require('compression')
const microcache = require('route-cache')
const Mute = require('mute')
const Youch = require('youch')

// const unmute = Mute() // 静音局，禁用掉 Webpack 抛弃的 API 信息。

import { createBundleRenderer } from 'vue-server-renderer'

const resolve = (file: string) => path.resolve(__dirname, file)

const isProd = process.env.NODE_ENV === 'prod'
const useMicroCache = process.env.MICRO_CACHE !== 'false'

const app = express()

const cache = LRU({
  max: 1000,
  maxAge: 1000 * 60 * 15
})

function createRenderer(bundle: any, options: any) {
  return createBundleRenderer(
    bundle,
    Object.assign(options, {
      cache,
      basedir: resolve('./dist'),
      runInNewContext: false
    })
  )
}

let renderer: any
let readyPromise: Promise<any>

const templatePath = resolve('src/index.template.html')

if (isProd) {
  const template = fs.readFileSync(templatePath, 'utf-8')
  const bundle = require(resolve('./dist/vue-ssr-server-bundle.json'))
  const clientManifest = require(resolve('./dist/vue-ssr-client-manifest.json'))
  renderer = createRenderer(bundle, {
    template,
    clientManifest
  })
} else {
  readyPromise = waitParcel(app, templatePath, (bundle: any, options: any) => {
    renderer = createRenderer(bundle, options)
  })
}

const serve = (path: string, cache: boolean) =>
  express.static(resolve(path), {
    maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
  })

app.use(compression({ threshold: 0 }))

app.use(favicon('./public/favicon.ico'))

app.use('/dist', serve('./dist', true))
app.use('/public', serve('./public', true))
app.use('/manifest.json', serve('./manifest.json', true))
app.use('/service-worker.js', serve('./dist/service-worker.js', false))

app.use(
  microcache.cacheSeconds(1, (req: any) => useMicroCache && req.originalUrl)
)

const handleError = (err: any, req: any, res: any) => {
  if (err.url) {
    res.redirect(err.url)
  } else if (err.code === 404) {
    res.status(404).send(err)
  } else {
    console.log(err)
    const youch = new Youch(err, req)
    youch.toHTML().then(html => {
      res.writeHead(200, { 'content-type': 'text/html' })
      res.write(html)
      res.end()
    })
    console.error(`error during render : ${req.url}`)
    console.error(err.stack)
  }
}

function render(req: any, res: any) {
  const s = Date.now()
  res.setHeader('Content-Type', 'text/html')
  const context = {
    title: 'App',
    url: req.url
  }
  renderer.renderToString(context, (err: any, html: string) => {
    if (err) {
      return handleError(err, req, res)
    }
    res.send(html)
    if (!isProd) {
      console.log(`whole request: ${Date.now() - s}ms`)
    }
  })
}

app.get(
  '*',
  isProd
    ? render
    : (req, res) => {
        readyPromise.then(() => render(req, res))
      }
)

const port = process.env.PORT || 4000

app.listen(port, () => {
  // unmute() // 取消静音
  console.log(`server started at http://localhost:${port}`)
})
