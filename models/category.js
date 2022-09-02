'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.belongsTo(models.Admin, { foreignKey: 'adminId' })
      Category.hasMany(models.Item, {
        foreignKey: 'categoryId',
        as: 'category'
      })
    }
  }
  Category.init(
    {
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
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      modelName: 'Category',
      tableName: 'categories'
    }
  )
  return Category
}
