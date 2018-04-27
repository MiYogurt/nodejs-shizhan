'use strict'
module.exports = app => {
  const { STRING, TEXT } = app.Sequelize
  const FM = app.model.define('FM', {
    title: STRING(40),
    image_url: STRING(20),
    audio_url: STRING(20),
    content: TEXT,
    description: STRING
  })
  FM.associate = function() {
    // FM 与 Tag 的多态多对多
    FM.belongsToMany(app.model.Tag, {
      through: {
        model: app.model.Taginfo,
        unique: false,
        scope: {
          type: 'fm'
        }
      },
      foreignKey: 'info_id',
      constraints: false
    })
    app.model.Tag.belongsToMany(FM, {
      through: {
        model: app.model.Taginfo,
        unique: false
      },
      foreignKey: 'tag_id',
      constraints: false
    })
  }

  return FM
}
