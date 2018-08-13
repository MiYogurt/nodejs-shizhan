'use strict'
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('authorizations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      code: {
        type: Sequelize.STRING
      },
      expires_at: {
        type: Sequelize.DATE
      },
      redirect_uri: {
        type: Sequelize.STRING
      },
      scope: {
        type: Sequelize.STRING
      },
      client_id: {
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('authorizations')
  }
}
