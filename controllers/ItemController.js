const { Item, Category } = require('../models')

const GetItemById = async (req, res) => {
  try {
    const item = await Item.findOne({
      where: { id: req.params.item_id },
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
    const createdItem = await Item.create({
      name: req.body.name,
      description: req.body.description
    })
    res.send(createdItem)
  } catch (error) {
    throw error
  }
}

const UpdateItem = async (req, res) => {
  try {
    const updatedItem = await Item.create(
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
  GetItemById,
  CreateItem,
  UpdateItem,
  DeleteItem
}
