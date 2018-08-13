'use strict'

const REST = require('./rest')

class Image extends REST {
  constructor(ctx) {
    super(ctx, 'Image')
  }
}

module.exports = Image
