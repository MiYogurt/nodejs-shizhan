'use strict';
module.exports = {
  up: (queryInterface, { INTEGER, DATE, STRING }) => {
    return queryInterface.createTable('Invitations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: INTEGER,
      },
      code: STRING(8),
      user_id: INTEGER,
      use_user_id: INTEGER,
      use_username: STRING(40),
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
    return queryInterface.dropTable('Invitations');
  },
};
