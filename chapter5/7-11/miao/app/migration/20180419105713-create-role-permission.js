'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('RolePermissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      role_id: {
        type: Sequelize.INTEGER
      },
      permisstion_id: {
        type: Sequelize.INTEGER
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('RolePermissions')
  }
}
