'use strict';
module.exports = {
  up: (queryInterface, { INTEGER, STRING, DATE, TINYINT }) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: INTEGER,
      },
      email: STRING(40),
      password: STRING,
      inviter_id: INTEGER,
      username: STRING(40),
      weibo: STRING(40),
      weixin: STRING(40),
      team_id: INTEGER,
      receive_remote: TINYINT(1),
      email_verifyed: TINYINT(1),
      avatar: STRING(40),
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
    return queryInterface.dropTable('Users');
  },
};
