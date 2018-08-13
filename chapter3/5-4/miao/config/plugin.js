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
  package: 'egg-passport',
};

