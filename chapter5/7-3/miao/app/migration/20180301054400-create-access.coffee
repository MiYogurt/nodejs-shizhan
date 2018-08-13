'use strict'
module.exports =
  up: (queryInterface, Sequelize) ->
    queryInterface.createTable 'Accesses',
      id:
        allowNull: false
        autoIncrement: true
        primaryKey: true
        type: Sequelize.INTEGER
      token: type: Sequelize.STRING
      token_expires_at: type: Sequelize.DATE
      scope: type: Sequelize.STRING
      client_id: type: Sequelize.INTEGER
      user_id: type: Sequelize.INTEGER
      createdAt:
        allowNull: false
        type: Sequelize.DATE
      updatedAt:
        allowNull: false
        type: Sequelize.DATE
  down: (queryInterface, Sequelize) ->
    queryInterface.dropTable 'Accesses'
