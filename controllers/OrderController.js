const { Order } = require('../models')

const GetOrders = async (req, res) => {
  try {
    const orders = await Order.findAll()
    res.send(orders)
  } catch (e) {
    throw e
  }
}

const CreateOrder = async (req, res) => {
  try {
    const createdOrder = await Order.create({
      ...req.body,
      customerId: req.params.customer_id
    })
    res.send(createdOrder)
  } catch (e) {
    throw e
  }
}

module.exports = {
  GetOrders,
  CreateOrder
}
