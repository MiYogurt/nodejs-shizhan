'use strict'
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize
  const TeamStatus = app.model.define('TeamStatus', {
    type: STRING(20),
    user_id: INTEGER,
    team_id: INTEGER,
    type_link: STRING(20),
    title: STRING(40),
    image_url: STRING(20)
  })
  TeamStatus.associate = function() {
    TeamStatus.belongsTo(app.model.User)
    app.model.User.hasMany(TeamStatus)
    app.model.Team.hasMany(TeamStatus)
    TeamStatus.belongsTo(app.model.Team)
  }
  return TeamStatus
}
