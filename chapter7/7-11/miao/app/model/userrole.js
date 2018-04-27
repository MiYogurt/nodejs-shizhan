'use strict'

module.exports = app => {
  const { model: sequelize, Sequelize: DataTypes } = app
  const UserRole = sequelize.define(
    'UserRole',
    {
      user_id: DataTypes.INTEGER,
      role_id: DataTypes.INTEGER
    },
    { timestamps: false }
  )

  UserRole.associate = function() {
    app.model.Role.belongsToMany(app.model.User, {
      through: {
        model: this,
        unique: false
      },
      foreignKey: 'role_id'
    })

    app.model.User.belongsToMany(app.model.Role, {
      through: {
        model: this,
        unique: false
      },
      foreignKey: 'user_id'
    })
  }

  return UserRole
}
