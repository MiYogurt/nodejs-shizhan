'use strict'

const { app, assert } = require('egg-mock/bootstrap')

describe('test/app/controller/home.test.js', () => {
  it('should assert', async function() {
    const pkg = require('../../../package.json')
    assert(app.config.keys.startsWith(pkg.name))

    // const ctx = app.mockContext({});
    // await ctx.service.xx();
  })

  it('should GET /', () => {
    return app
      .httpRequest()
      .get('/')
      .expect('hi, egg')
      .expect(200)
  })
})
