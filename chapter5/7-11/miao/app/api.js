'use strict'

const nullC = async ctx => (ctx.body = '')

module.exports = ctl => ({
  post: {
    '/signup': ctl.user.signUp, // 注册
    '/signin': ctl.passport.local, // 登录
    '/email/send': ctl.user.emailSend,
    '/comment/img': ctl.comment.image,
    '/image': ctl.image.create,
    '/team/member': ctl.team.member,
    '/team/create': ctl.team.create
  },
  get: {
    '/': ctx => (ctx.body = ctx.state),
    '/i_image': ctl.image.index,
    '/i_image/:id': ctl.image.show,
    '/user_image': ctl.image.forme,
    '/invitation': ctl.invitation.forme,
    '/push_image_token': ctl.image.sign,
    '/delete_img_file': ctl.image.delImageFile,
    '/team/:id': ctl.team.show,
    '/search_user': ctl.team.search,
    '/check/team': ctl.team.checkCanCreat
  }
})

