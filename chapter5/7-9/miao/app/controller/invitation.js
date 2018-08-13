'use strict'

class InvitationController extends Controller {
  async forme(ctx) {
    ctx.body = await ctx.model.Invitation.findAll({
      where: {
        user_id: ctx.state.user.id
      }
    })
  }
}

module.exports = InvitationController
