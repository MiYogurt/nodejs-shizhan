'use strict';
module.exports = {
  up: (queryInterface, { STRING, INTEGER, DATE }) => {
    return queryInterface.createTable('Teams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: INTEGER,
      },
      name: STRING(40),
      profile: STRING,
      creater_id: INTEGER,
      avatar: STRING(20),
      created_at: {
        allowNull: false,
        type: DATE,
      },
      updated_at: {
        allowNull: false,
        type: DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Teams');
  },
};
