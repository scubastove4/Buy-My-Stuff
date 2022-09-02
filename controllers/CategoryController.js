const { Category, Item } = require('../models')

const GetAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      order: [['ASC']],
      include: [
        {
          model: Item,
          as: 'category_items',
          attributes: ['id']
        }
      ]
    })
    res.send(categories)
  } catch (error) {
    throw error
  }
}

const GetCategoryById = async (req, res) => {
  try {
    const category = await Category.findOne({
      where: { id: req.params.category_id },
      include: [
        {
          model: Item,
          as: 'category_items'
        }
      ]
    })
    res.send(category)
  } catch (error) {
    throw error
  }
}

const CreateCategory = async (req, res) => {
  try {
    const createdCategory = await Category.create({
      adminId: req.body.adminId,
      name: req.body.name,
      description: req.body.description
    })
    res.send(createdCategory)
  } catch (error) {
    throw error
  }
}

const UpdateCategory = async (req, res) => {
  try {
    const updatedCategory = await Category.create(
      { ...req.body },
      { where: { id: req.params.category_id }, returning: true }
    )
    res.send(updatedCategory)
  } catch (error) {
    throw error
  }
}

const DeleteCategory = async (req, res) => {
  try {
    await Category.destroy({ where: { id: req.params.category_id } })
    res.send({
      msg: 'Category deleted',
      payload: req.params.category_id,
      status: 'Ok'
    })
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetAllCategories,
  GetCategoryById,
  CreateCategory,
  UpdateCategory,
  DeleteCategory
}
