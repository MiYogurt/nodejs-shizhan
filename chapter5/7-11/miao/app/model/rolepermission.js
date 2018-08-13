'use strict'

module.exports = app => {
  const { model: sequelize, Sequelize: DataTypes } = app
  const RolePermission = sequelize.define(
    'RolePermission',
    {
      role_id: DataTypes.INTEGER,
      permisstion_id: DataTypes.INTEGER
    },
    {
      timestamps: false
    }
  )
  RolePermission.associate = function() {
    app.model.Role.belongsToMany(app.model.Permisstion, {
      through: {
        model: this,
        unique: false
      },
      foreignKey: 'role_id'
    })

    app.model.Permisstion.belongsToMany(app.model.Role, {
      through: {
        model: this,
        unique: false
      },
      foreignKey: 'permisstion_id'
    })
  }
  return RolePermission
}
