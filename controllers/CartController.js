const { Cart, Customer, Item } = require('../models')

const GetCustomerCart = async (req, res) => {
  try {
    const cart = await Customer.findOne({
      where: { id: req.params.customer_id },
      include: {
        model: Item,
        as: 'cart',
        through: { attributes: ['quantity'] },
        attributes: ['id', 'name', 'price', 'image']
      }
    })
    res.send(cart)
  } catch (error) {
    throw error
  }
}

const CreateCartItem = async (req, res) => {
  try {
    const createdCart = await Cart.create({
      customerId: req.body.customerId,
      itemId: req.body.itemId
    })
    res.send(createdCart)
  } catch (error) {
    throw error
  }
}

const DeleteCartItem = async (req, res) => {
  try {
    await Cart.destroy({
      where: {
        customerId: req.body.customerId,
        itemId: req.body.itemId
      }
    })
    res.send({
      msg: 'Cart deleted',
      payload: req.params.cart_id,
      status: 'Ok'
    })
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetCustomerCart,
  CreateCartItem,
  DeleteCartItem
}
