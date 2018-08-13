'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Roles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      meta: {
        type: Sequelize.TEXT
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Roles')
  }
}
