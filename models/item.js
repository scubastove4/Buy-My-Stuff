'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item.belongsTo(models.Category, {
        as: 'category_items',
        foreignKey: 'categoryId'
      })
      Item.belongsToMany(models.Customer, {
        as: 'cart_items',
        through: models.Cart,
        foreignKey: 'itemId'
      })
      Item.belongsToMany(models.Customer, {
        as: 'saved_items',
        through: models.Bookmark,
        foreignKey: 'itemId'
      })
    }
  }
  Item.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      adminId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'admins',
          key: 'id'
        },
        field: 'admin_id'
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'categories',
          key: 'id'
        },
        field: 'category_id'
      },
      image: {
        type: DataTypes.STRING
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      modelName: 'Item',
      tableName: 'items'
    }
  )
  return Item
}
