module.exports = ({ model: sequelize, Sequelize: DataTypes }) => {
  const Permisstion = sequelize.define(
    'Permisstion',
    {
      name: DataTypes.STRING,
      meta: DataTypes.TEXT
    },
    {
      underscored: false,
      timestamps: false
    }
  )

  return Permisstion
}
