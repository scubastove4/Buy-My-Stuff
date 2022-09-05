const { Cart } = require('../models')

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
  CreateCart,
  DeleteCart
}
