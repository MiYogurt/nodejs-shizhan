'use strict'
const Email = require('emailjs/email')
const mailK = Symbol.for('MY_EMAIL')
const payK = Symbol.for('MY_PAY')
const bucketK = Symbol.for('MY_BUCKET')
const upyunClientK = Symbol.for('MY_UPYUN_CLIENT')
const Alipay = require('alipay-node-sdk')
const upyun = require('upyun')

module.exports = {
  get pay() {
    if (this[payK]) {
      return this[payK]
    }
    this[payK] = new Alipay(this.app.config.pay)
    return this[payK]
  },
  get upyunBucket() {
    if (this[bucketK]) {
      return this[bucketK]
    }
    const { name, username, password } = this.app.config.upyun
    this[bucketK] = new upyun.Bucket(name, username, password)
    return this[bucketK]
  },
  get upyunClient() {
    if (this[upyunClientK]) {
      return this[upyunClientK]
    }
    const { name, username, password } = this.app.config.upyun
    this[upyunClientK] = new upyun.Client(
      new upyun.Service(name, username, password)
    )
    return this[upyunClientK]
  },
  random(len) {
    return Math.random()
      .toString(36)
      .slice(3, len + 3)
  },
  async send(title, html, email, other) {
    const opts = this.app.config.email
    if (!this[mailK]) {
      this[mailK] = Email.server.connect(
        Object.assign({}, opts, { user: opts.username, ssl: true })
      )
    }
    let attachment = [{ data: html, alternative: true }]
    if (other) attachment = attachment.concat(other)
    return new Promise((resolve, reject) => {
      this[mailK].send(
        {
          subject: title,
          from: opts.sender,
          to: email,
          attachment
        },
        (err, msg) => {
          if (err) reject({ code: -1, msg: 'faliure' })
          resolve({ code: 0, msg: 'faliure' })
        }
      )
    })
  },
  async sign_token(user, remember_me) {
    return new Promise((resolve, reject) => {
      this.app.jwt.sign(
        user,
        this.app.config.jwt.secret,
        {
          expiresIn: remember_me ? '7d' : '1d'
        },
        (err, token) => {
          err && reject(err)
          resolve(token)
        }
      )
    })
  }
}
