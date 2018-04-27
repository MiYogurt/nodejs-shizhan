'use strict'
module.exports = function(app) {
  const DataTypes = app.Sequelize
  const Authorization = app.model.define(
    'Authorization',
    {
      code: DataTypes.STRING,
      expires_at: DataTypes.DATE,
      redirect_uri: DataTypes.STRING,
      scope: DataTypes.STRING,
      client_id: DataTypes.STRING,
      user_id: DataTypes.INTEGER
    },
    {
      underscored: false
    }
  )
  Object.assign(Authorization, {
    async findByCode(code) {
      return this.findOne({
        where: {
          code
        }
      })
    }
  })
  return Authorization
}
