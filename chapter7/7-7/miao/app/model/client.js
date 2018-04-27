'use strict'
module.exports = app => {
  const DataTypes = app.Sequelize
  const Client = app.model.define(
    'Client',
    {
      client_id: {
        type: DataTypes.INTEGER,
        unique: true
      },
      user_id: DataTypes.INTEGER,
      client_secret: DataTypes.STRING,
      redirect_uris: DataTypes.STRING,
      grants: DataTypes.STRING
    },
    {
      underscored: false
    }
  )
  Client.prototype.associate = function() {
    this.belongTo(app.model.User)
    app.model.User.hasOne(this)
  }
  Client.findByClinetId = id =>
    Client.findOne({
      where: {
        client_id: id
      }
    })

  Client.Auth = (client_id, client_secret) => {
    const where = client_secret
      ? { where: { client_id, client_secret } }
      : { where: { client_id } }
    return Client.findOne(where)
  }

  return Client
}
