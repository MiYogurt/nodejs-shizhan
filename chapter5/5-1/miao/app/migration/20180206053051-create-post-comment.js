'use strict';
module.exports = {
  up: (queryInterface, { INTEGER, STRING, DATE }) => {
    return queryInterface.createTable('PostComments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: INTEGER,
      },
      post_id: INTEGER,
      content: STRING,
      parent_id: INTEGER,
      user_id: INTEGER,
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
    return queryInterface.dropTable('PostComments');
  },
};
