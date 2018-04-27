'use strict';
module.exports = {
  up: (queryInterface, { INTEGER, STRING, DATE, FLOAT, TINYINT }) => {
    return queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: INTEGER,
      },
      order_id: STRING(48),
      user_id: INTEGER,
      price: FLOAT,
      state: TINYINT,
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
    return queryInterface.dropTable('Orders');
  },
};
