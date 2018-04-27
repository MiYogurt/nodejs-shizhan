'use strict'
module.exports = {
  up: (queryInterface, { INTEGER, STRING, DATE, TINYINT }) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: INTEGER
      },
      email: {
        type: STRING(40),
        unique: true
      },
      password: STRING,
      username: STRING(40),
      weibo: STRING(40),
      weixin: STRING(40),
      team_id: INTEGER,
      receive_remote: TINYINT(1),
      email_verifyed: TINYINT(1),
      avatar: STRING(70),
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
    return queryInterface.dropTable('Users')
  }
}
