const { Cart, Customer, Item } = require('../models')

const GetCustomerCart = async (req, res) => {
  try {
    const cart = await Customer.findOne({
      where: { id: req.params.customer_id },
      include: {
        model: Item,
        as: 'cart',
        through: { as: 'cart_props', attributes: ['id', 'quantity'] },
        attributes: ['name', 'price', 'image']
      }
    })
    res.send(cart)
  } catch (e) {
    throw e
  }
}

const CreateCartItem = async (req, res) => {
  try {
    const createdCart = await Cart.create({
      customerId: req.body.customerId,
      itemId: req.body.itemId
    })
    res.send(createdCart)
  } catch (e) {
    throw e
  }
}

const UpdateCartQuantity = async (req, res) => {
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

const DeleteCartItem = async (req, res) => {
  try {
    await Cart.destroy({
      where: {
        id: req.params.cart_item_id
      }
    })
    res.send({
      msg: 'Cart deleted',
      payload: req.params.cart_item_id,
      status: 'Ok'
    })
  } catch (e) {
    throw e
  }
}

module.exports = {
  GetCustomerCart,
  CreateCartItem,
  DeleteCartItem
}
