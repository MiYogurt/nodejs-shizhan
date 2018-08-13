'use strict';
module.exports = app => {
  const { STRING } = app.Sequelize;
  const Tag = app.model.define('Tag', {
    name: STRING(20),
  });
  return Tag;
};
