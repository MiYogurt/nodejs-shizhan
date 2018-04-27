'use strict'

module.exports = ({ model: sequelize, Sequelize: DataTypes }) => {
  const Role = sequelize.define(
    'Role',
    {
      name: DataTypes.STRING,
      meta: DataTypes.TEXT
    },
    {
      timestamps: false
    }
  )

  return Role
}
