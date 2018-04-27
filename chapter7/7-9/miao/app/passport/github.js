'use strict'

const R = require('ramda')
module.exports = async (ctx, user) => {
  console.log(user)
  console.log(user.profile.emails[0].value)
  const data = { uid: user.id, provider: user.provider }
  const auth = (await ctx.model.Auth.findOrCreate({
    where: data,
    default: data
  }))[0]
  console.log(auth.user_id)

  if (auth.user_id) {
    const existsUser = await ctx.model.User.findOne({
      where: { id: auth.user_id }
    })
    console.log(existsUser)
    const raw_user = R.omit(['password'], existsUser.toJSON())
    const token = await ctx.sign_token(raw_user)
    ctx.body = token
    console.log(ctx.app.config.frontURL)
    ctx.unsafeRedirect(ctx.app.config.frontURL + '/signin?token=' + token)
    return raw_user
  }
  // 调用 service 注册新用户
  const newUser = await ctx.model.User.create({
    username: user.displayName,
    avatar: user.photo,
    eamil: user.profile.emails[0].value
  })
  auth.user_id = newUser.id
  await auth.save()
  const raw_user = R.omit(['password'], newUser.toJSON())
  const token = await ctx.sign_token(raw_user)
  ctx.body = token
  ctx.unsafeRedirect(ctx.app.config.frontURL + '/signin?token' + token)
  return raw_user
}

