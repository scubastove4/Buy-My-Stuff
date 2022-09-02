'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Admin.hasMany(models.Category, { foreignKey: 'adminId' })
      Admin.hasMany(models.Item, { foreignKey: 'adminId' })
    }
  }
  Admin.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'first_name'
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      passwordDigest: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'password_digest'
      },
      isAdmin: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'is_admin',
        defaultValue: true
      }
    },
    {
      sequelize,
      modelName: 'Admin',
      tableName: 'admins'
    }
  )
  return Admin
}
