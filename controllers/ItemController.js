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
  } catch (e) {
    throw e
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
  } catch (e) {
    throw e
  }
}

const CreateItem = async (req, res) => {
  try {
    let createdItem
    if (req.file) {
      createdItem = await Item.create({
        ...req.body,
        image: req.file.publicUrl
      })
    } else {
      createdItem = await Item.create(req.body)
    }
    res.send(createdItem)
  } catch (e) {
    throw e
  }
}

const UpdateItem = async (req, res) => {
  try {
    let updatedItem
    if (req.file) {
      updatedItem = await Item.update(
        { ...req.body, image: req.file.publicUrl },
        { where: { id: req.params.item_id }, returning: true }
      )
    } else {
      updatedItem = await Item.update(
        { ...req.body },
        { where: { id: req.params.item_id }, returning: true }
      )
    }
    res.send(updatedItem)
  } catch (e) {
    throw e
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
  } catch (e) {
    throw e
  }
}

module.exports = {
  GetAllItems,
  GetItemById,
  CreateItem,
  UpdateItem,
  DeleteItem
}
