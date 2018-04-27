'use strict'
module.exports = {
  up: (queryInterface, { INTEGER, STRING, DATE, TEXT }) => {
    return queryInterface.createTable('FMs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: INTEGER
      },
      title: STRING(40),
      image_url: STRING(20),
      audio_url: STRING(20),
      content: TEXT,
      description: STRING,
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
    return queryInterface.dropTable('FMs')
  }
}
