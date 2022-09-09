'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.belongsToMany(models.Item, {
        as: 'cart',
        through: models.Cart,
        foreignKey: 'customerId'
      })
      Customer.belongsToMany(models.Item, {
        as: 'bookmarks',
        through: models.Bookmark,
        foreignKey: 'customerId'
      })
    }
  }
  Customer.init(
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
        defaultValue: false
      }
    },
    {
      sequelize,
      modelName: 'Customer',
      tableName: 'customers'
    }
  )
  return Customer
}
