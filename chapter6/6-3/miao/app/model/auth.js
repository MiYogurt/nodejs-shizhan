'use strict'
module.exports = function({ model: sequelize, Sequelize: DataTypes }) {
  const Auth = sequelize.define(
    'Auth',
    {
      provider: DataTypes.STRING,
      uid: DataTypes.STRING,
      user_id: DataTypes.INTEGER
    },
    { timestamps: false }
  )
  return Auth
}
