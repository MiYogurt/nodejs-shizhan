'use strict'
module.exports = {
  up: (queryInterface, { INTEGER, DATE, STRING }) => {
    return queryInterface.createTable('TagInfos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: INTEGER
      },
      tag_id: INTEGER,
      info_id: INTEGER,
      type: STRING(10),
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
    return queryInterface.dropTable('TagInfos')
  }
}
