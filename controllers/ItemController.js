const { Item, Category } = require('../models')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname)
  }
})

const GetAllItems = async (req, res) => {
  try {
    const items = await Item.findAll({
      order: [['name', 'ASC']],
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name']
        }
      ]
    })
    res.send(items)
  } catch (error) {
    throw error
  }
}

const GetItemById = async (req, res) => {
  try {
    const item = await Item.findOne({
      where: { id: req.params.item_id },
      order: [['name', 'ASC']],
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name']
        }
      ]
    })
    res.send(item)
  } catch (error) {
    throw error
  }
}

const CreateItem = async (req, res) => {
  try {
    let createdItem = null
    if (req.file) {
      createdItem = await Item.create({
        name: req.body.name,
        adminId: req.body.adminId,
        categoryId: req.body.categoryId,
        image: req.file.publicUrl,
        price: req.body.price,
        description: req.body.description
      })
    } else {
      createdItem = await Item.create(req.body)
    }
    res.send(createdItem)
  } catch (error) {
    throw error
  }
}

const UpdateItem = async (req, res) => {
  try {
    const updatedItem = await Item.update(
      { ...req.body },
      { where: { id: req.params.item_id }, returning: true }
    )
    res.send(updatedItem)
  } catch (error) {
    throw error
  }
}

const DeleteItem = async (req, res) => {
  try {
    await Item.destroy({ where: { id: req.params.item_id } })
    res.send({
      msg: 'Item deleted',
      payload: req.params.item_id,
      status: 'Ok'
    })
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetAllItems,
  GetItemById,
  CreateItem,
  UpdateItem,
  DeleteItem
}
