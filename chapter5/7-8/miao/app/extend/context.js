'use strict'
const Email = require('emailjs/email')
const mailK = Symbol.for('MY_EMAIL')
const payK = Symbol.for('MY_PAY')
const Alipay = require('alipay-node-sdk')

module.exports = {
    get pay() {
        if (this[payK]) {
            return this[payK]
        }
        this[payK] = new Alipay(this.app.config.pay)
        return this[payK]
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
            this[mailK].send({
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
                this.app.config.jwt.secret, {
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