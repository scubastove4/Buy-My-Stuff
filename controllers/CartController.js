const { Cart, Customer, Item } = require('../models')

const GetCustomerCart = async (req, res) => {
  try {
    const cart = await Customer.findOne({
      where: { id: req.params.customer_id },
      include: {
        model: Item,
        as: 'cart',
        through: { as: 'cart_props', attributes: ['id', 'quantity'] },
        attributes: [['id', 'item_id'], 'name', 'price', 'image']
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
      customerId: req.params.customer_id,
      itemId: req.params.item_id
    })
    res.send(createdCart)
  } catch (e) {
    throw e
  }
}

const UpdateCartItemQuantity = async (req, res) => {
  try {
    const updatedQuantity = await Cart.update(
      { ...req.body },
      { where: { id: req.params.cart_item_id }, returning: true }
    )
    res.send(updatedQuantity)
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
      msg: 'Cart item deleted',
      payload: req.params.cart_item_id,
      status: 'Ok'
    })
  } catch (e) {
    throw e
  }
}

const DeleteWholeCart = async (req, res) => {
  try {
    await Cart.destroy({
      where: {
        customerId: req.params.customerId
      }
    })
    res.send({
      msg: 'Cart deleted',
      payload: req.params.customerId,
      status: 'Ok'
    })
  } catch (e) {
    throw e
  }
}

module.exports = {
  GetCustomerCart,
  CreateCartItem,
  UpdateCartItemQuantity,
  DeleteCartItem,
  DeleteWholeCart
}
