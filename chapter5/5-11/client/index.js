const server = require('server')
const p = require('phin').promisified

const { get } = server.router
const { redirect, json } = server.reply

const client_id = '1'
const redirect_uri = 'http://127.0.0.1:7002/auth/redirect'
const state = 'somestate'
const client_secret = '3333'

server({ port: 7002 }, [
    get('/', ctx =>
        redirect(
            `http://127.0.0.1:7001?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&state=${state}`
        )
    ),
    get('/auth/redirect', async ctx => {
        console.log(ctx.query.code)
        const res = await p({
            url: 'http://127.0.0.1:7001/token',
            method: 'POST',
            parse: 'json',
            timeout: 3000,
            form: {
                grant_type: 'authorization_code',
                code: ctx.query.code,
                state: ctx.query.state,
                client_id: client_id,
                client_secret: client_secret,
                redirect_uri: redirect_uri
            }
        })
        console.log(res.body)
        return json(res.body)
    })
])
