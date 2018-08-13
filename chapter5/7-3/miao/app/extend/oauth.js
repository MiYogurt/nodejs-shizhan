'use strict'
const R = require('ramda')
module.exports = app => {
  const { User, Authorization, Client, Refresh, Access } = app.model
  const VALID_SCOPES = ['r_user', 'r_image']
  console.log(app.model.models)
  return class {
    constructor(ctx) {
      this.ctx = ctx
    }

    async getUser(username, password) {
      return await User.Auth(username, password)
    }

    async getAuthorizationCode(authorizationCode) {
      const auth = await Authorization.findByCode(authorizationCode)
      let [client, user] = await Promise.all([
        Client.findByClinetId(auth.client_id),
        User.findById(auth.user_id)
      ])

      user = R.omit(['password'], user.toJSON())
      return {
        code: auth.code,
        expiresAt: auth.expires_at,
        redirectUri: auth.redirect_uri,
        scope: auth.scope,
        client: client.toJSON(),
        user
      }
    }
    async getClient(client_id, client_secret) {
      const client = await Client.Auth(client_id, client_secret)
      if (!client) return false
      return {
        id: client.client_id,
        redirectUris: client.redirect_uris.split(','),
        grants: client.grants.split(',')
      }
    }
    async saveToken(token, client, user) {
      const access = await Access.create({
        token: token.accessToken,
        token_expires_at: token.accessTokenExpiresAt,
        scope: token.scope,
        client_id: client.id,
        user_id: user.id
      })
      const refresh = await Refresh.create({
        token: token.refreshToken,
        token_expires_at: token.refreshTokenExpiresAt,
        scope: token.scope,
        client_id: client.id,
        user_id: user.id
      })
      return {
        accessToken: access.token,
        accessTokenExpiresAt: access.token_expires_at,
        refreshToken: refresh.token,
        refreshTokenExpiresAt: refresh.token_expires_at,
        scope: access.scope,
        client: { id: access.client_id },
        user: { id: access.user_id }
      }
    }
    async saveAuthorizationCode(code, client, user) {
      const auth = await Authorization.create({
        code: code.authorizationCode,
        expires_at: code.expiresAt,
        redirect_uri: code.redirectUri,
        scope: code.scope,
        client_id: client.id,
        user_id: user.id
      })

      return {
        authorizationCode: auth.code,
        expiresAt: auth.expires_at,
        redirectUri: auth.redirect_uri,
        scope: auth.scope,
        client: { id: auth.client_id },
        user: { id: auth.user_id }
      }
    }

    async revokeAuthorizationCode(code) {
      const auth = await Authorization.findByCode(code.code)
      if (!auth) return true
      return await auth.destroy()
    }
    validateScope(user, client, scope) {
      if (!scope) {
        return 'r_user'
      }
      return scope
        .split(',')
        .filter(s => VALID_SCOPES.indexOf(s) >= 0)
        .join(',')
    }

    async getAccessToken(accessToken) {
      const token = await Access.getByToken(accessToken)
      const client = await Client.findByClinetId(token.client_id)
      const user = await User.findById(token.user_id)
      return {
        accessToken: token.token,
        accessTokenExpiresAt: token.token_expires_at,
        scope: token.scope,
        client, // with 'id' property
        user
      }
    }

    verifyScope(token, scope) {
      const requestedScopes = scope.split(',')
      const authorizedScopes = token.scope.split(',')
      return requestedScopes.every(s => authorizedScopes.indexOf(s) >= 0)
    }

    async getRefreshToken(refreshToken) {
      const token = await Refresh.findByToken(refreshToken.refreshToken)
      const client = await Client.findByClinetId(refreshToken.client_id)
      const user = await User.findById(refreshToken.user_id)
      return {
        refreshToken: token.token,
        refreshTokenExpiresAt: token.token_expires_at,
        scope: token.scope,
        client,
        user
      }
    }
    async revokeToken(token) {
      return Refresh.destroy({
        where: {
          token: token.refreshToken
        }
      })
    }
  }
}
