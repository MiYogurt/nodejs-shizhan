'use strict';
module.exports = app => {
  const { STRING, TEXT, INTEGER } = app.Sequelize;
  const Post = app.model.define('Post', {
    title: STRING(40),
    description: STRING(255),
    content: TEXT,
    view: INTEGER,
    category_id: INTEGER,
    user_id: INTEGER,
  });

  Post.associate = function () {
    Post.belongsTo(app.model.Category);
    app.model.Category.hasMany(Post);
  };
  return Post;
};
