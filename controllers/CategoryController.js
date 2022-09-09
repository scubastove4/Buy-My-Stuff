const { Category, Item } = require('../models')

const GetAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      order: [['name', 'ASC']],
      include: [
        {
          model: Item,
          as: 'category_items',
          attributes: ['id']
        }
      ]
    })
    res.send(categories)
  } catch (e) {
    throw e
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
  } catch (e) {
    throw e
  }
}

const CreateCategory = async (req, res) => {
  try {
    const createdCategory = await Category.create(req.body)
    res.send(createdCategory)
  } catch (e) {
    throw e
  }
}

const UpdateCategory = async (req, res) => {
  try {
    const updatedCategory = await Category.update(
      { ...req.body },
      { where: { id: req.params.category_id }, returning: true }
    )
    res.send(updatedCategory)
  } catch (e) {
    throw e
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
  } catch (e) {
    throw e
  }
}

module.exports = {
  GetAllCategories,
  GetCategoryById,
  CreateCategory,
  UpdateCategory,
  DeleteCategory
}
