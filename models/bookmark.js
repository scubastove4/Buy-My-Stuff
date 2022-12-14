'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Bookmark extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Bookmark.init(
    {
      customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'customers',
          key: 'id'
        },
        field: 'customer_id'
      },
      itemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'items',
          key: 'id'
        },
        field: 'item_id'
      }
    },
    {
      sequelize,
      modelName: 'Bookmark',
      tableName: 'bookmarks'
    }
  )
  return Bookmark
}
