'use strict'

const Controller = require('egg').Controller
const uuid = require('uuid/v1')

class PayController extends Controller {
  async index() {
    const { ctx, app } = this
    const month = parseInt(ctx.params.month) || 1
    const user_id = ctx.request.query.id

    const order = await app.model.Order.create({
      state: 0,
      order_id: uuid(),
      user_id,
      price: month * 10.0
    })

    const { returnUrl } = app.config.pay

    const data = ctx.pay.pagePay({
      subject: '测试商品',
      body: '测试商品描述',
      outTradeId: order.order_id,
      return_url: returnUrl,
      timeout: '10m',
      amount: order.price,
      goodsType: '0',
      qrPayMode: 2
    })

    const result = await ctx.curl(app.config.pay.gateway, { data })

    ctx.set(result.headers)
    ctx.status = result.status
    ctx.body = result.data
  }

  async alipay(ctx) {
    return (ctx.body = 'success')
  }

  async success(ctx) {
    const ok = ctx.pay.signVerify(ctx.request.query) // 确保是支付宝发送过来的
    console.log(ok)
    if (!ok) {
      ctx.status = 400
      return
    }
    info(ctx.request.query)
    info(ctx.request.body)
    const order = await ctx.model.Order.findOne({
      where: {
        order_id: ctx.query.out_trade_no
      }
    })
    // TODO: 添加权限
    console.log(order)
    order.state = 1
    await order.save()
    return (ctx.body = 'success')
  }
}

module.exports = PayController
