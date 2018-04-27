'use strict'
module.exports = app => {
  const { STRING, INTEGER, BOOLEAN } = app.Sequelize
  const Team = app.model.define('Team', {
    name: STRING(40),
    profile: STRING,
    creater_id: INTEGER,
    avatar: STRING(20),
    lock: BOOLEAN
  })
  Team.associate = function() {
    app.model.User.hasOne(Team, {
      foreignKey: 'creater_id',
      as: 'myTeam'
    })
    app.model.Team.belongsTo(app.model.User, {
      foreignKey: 'creater_id',
      as: 'creater'
    })

    Team.hasMany(app.model.User)
    app.model.User.belongsTo(Team)
  }
  return Team
}

