'use strict';
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;
  const Team = app.model.define('Team', {
    name: STRING(40),
    profile: STRING,
    creater_id: INTEGER,
    avatar: STRING(20),
  });
  Team.associate = function() {
    Team.belongsTo(app.model.User, {
      foreignKey: 'creater_id',
      as: 'creater',
    });
    app.model.User.hasMany(Team);
  };
  return Team;
};
