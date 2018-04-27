'use strict'
module.exports = {
  up: (queryInterface, { INTEGER, DATE, STRING }) => {
    return queryInterface.createTable('Images', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: INTEGER
      },
      title: STRING(40),
      description: STRING(255),
      view: INTEGER,
      main_url: STRING(20),
      list_url: STRING(90),
      user_id: INTEGER,
      created_at: {
        allowNull: false,
        type: DATE
      },
      updated_at: {
        allowNull: false,
        type: DATE
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Images')
  }
}
