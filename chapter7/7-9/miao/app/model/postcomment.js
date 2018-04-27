'use strict'
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize
  const PostComment = app.model.define('PostComment', {
    image_id: INTEGER,
    content: STRING,
    parent_id: INTEGER,
    user_id: INTEGER
  })

  PostComment.associate = function() {
    PostComment.belongsTo(app.model.User)
    app.model.User.hasMany(PostComment)

    PostComment.belongsTo(app.model.Image)
    app.model.Image.hasMany(PostComment)

    PostComment.belongsTo(PostComment, {
      as: 'parent'
    })

    PostComment.hasMany(PostComment, {
      foreignKey: 'parent_id',
      as: 'childeren'
    })
  }
  return PostComment
}
