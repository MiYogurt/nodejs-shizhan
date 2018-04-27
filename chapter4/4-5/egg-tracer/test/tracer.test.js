'use strict';

const mock = require('egg-mock');

describe('test/tracer.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/tracer-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, tracer')
      .expect(200);
  });
});
