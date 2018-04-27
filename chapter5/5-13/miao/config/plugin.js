'use strict'

// had enabled by egg
// exports.static = true;

exports.sequelize = {
  enable: true,
  package: 'egg-sequelize'
}

exports.flash = {
  enable: true,
  package: 'egg-msg-flash'
}

exports.validator = {
  enable: true,
  package: 'egg-y-validator'
}

exports.passport = {
  enable: true,
  package: 'egg-passport'
}

exports.jwt = {
  enable: true,
  package: 'egg-jwt'
}

exports.passportLocal = {
  enable: true,
  package: 'egg-passport-local'
}

exports.email = {
  enable: true,
  package: 'egg-mail'
}

exports.redis = {
  enable: true,
  package: 'egg-redis'
}

exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks'
}

exports.oAuth2Server = {
  enable: true,
  package: 'egg-oauth2-server'
}

exports.passportGithub = {
  enable: true,
  package: 'egg-passport-github'
}
