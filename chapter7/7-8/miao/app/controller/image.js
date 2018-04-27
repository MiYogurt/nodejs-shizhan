'use strict'

const REST = require('./rest')

class Image extends REST {
  constructor(ctx) {
    super(ctx, 'Image')
  }

  async index(ctx) {
    const { Image, Imagecomment, User } = ctx.model
    const { page = 1, split = 8 } = ctx.query
    const count = await Image.count()
    const allPage = Math.ceil(count / parseInt(split))
    const where = {
      limit: parseInt(split),
      offset: (parseInt(page) - 1) * parseInt(split),
      order: ['created_at'],
      include: [{ model: Imagecomment }, { model: User }]
    }
    const data = await Image.findAll(where)
    ctx.body = {
      allPage,
      currentPage: parseInt(page),
      split,
      data
    }
  }

  async show(ctx) {
    const { Image, Imagecomment, User } = ctx.model
    const { id } = ctx.params
    const where = {
      where: {
        id
      },
      include: [
        {
          model: Imagecomment,
          include: [
            'User',
            { model: Imagecomment, as: 'childeren', include: ['User'] }
          ]
        },
        {
          model: User
        }
      ]
    }
    const data = await Image.findOne(where)
    ctx.body = data
  }
}

module.exports = Image
