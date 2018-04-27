'use strict'

module.exports = ({ model: sequelize, Sequelize: DataTypes }) => {
  const Refresh = sequelize.define('Refresh', {
    token: {
      type: DataTypes.STRING,
      unique: true
    },
    token_expires_at: DataTypes.DATE,
    scope: DataTypes.STRING,
    client_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  })
  Refresh.findByToken = token => {
    return Refresh.findOne({
      where: {
        token
      }
    })
  }
  return Refresh
}
