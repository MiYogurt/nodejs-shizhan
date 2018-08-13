'use strict'

module.exports = ({ model: sequelize, Sequelize: DataTypes }) => {
  const Access = sequelize.define(
    'Access',
    {
      token: {
        type: DataTypes.STRING,
        unique: true
      },
      token_expires_at: DataTypes.DATE,
      scope: DataTypes.STRING,
      client_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER
    },
    {
      underscored: false
    }
  )

  Access.getByToken = token => {
    return Access.findOne({ where: { token } })
  }
  return Access
}
