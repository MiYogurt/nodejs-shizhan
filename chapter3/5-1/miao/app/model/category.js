'use strict';
module.exports = app => {
  const { STRING } = app.Sequelize;
  const Category = app.model.define('Category', {
    name: STRING(20),
  });
  return Category;
};
