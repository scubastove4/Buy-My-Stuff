const { Cart } = require('../models')

const GetCustomerCart = async (req, res) => {
  try {
    const cart = await Cart.findAll({
      where: { customerId: req.params.customer_id }
    })
    res.send(cart)
  } catch (error) {
    throw error
  }
}

const CreateCart = async (req, res) => {
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

const DeleteCart = async (req, res) => {
  try {
    await Cart.destroy({ where: { id: req.params.cart_id } })
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
  CreateCart,
  DeleteCart
}
