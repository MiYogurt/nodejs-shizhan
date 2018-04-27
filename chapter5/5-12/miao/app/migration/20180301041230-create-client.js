'use strict'
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('Clients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      client_id: {
        type: Sequelize.INTEGER,
        unique: true
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      client_secret: {
        type: Sequelize.STRING
      },
      redirect_uris: {
        type: Sequelize.STRING
      },
      grants: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Clients')
  }
}
