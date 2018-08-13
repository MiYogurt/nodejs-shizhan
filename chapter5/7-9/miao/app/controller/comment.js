'use strict'

const Controller = require('egg').Controller

class CommentController extends Controller {
  async image(ctx) {
    const user = ctx.state.user
    const { image_id, parent_id, content } = ctx.request.body
    const comment = await ctx.model.Imagecomment.create({
      image_id: image_id,
      user_id: user.id,
      parent_id: parent_id,
      content: content
    })
    ctx.body = comment
  }
}

module.exports = CommentController
