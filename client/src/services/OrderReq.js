import Client from './api'

export const GetAllOrders = async () => {
  try {
    const res = await Client.get('/orders')
    return res.data
  } catch (e) {
    console.error(e)
  }
}

export const CreateOrder = async (customerId, orderId, order) => {
  try {
    const orderInfo = {
      orderId: orderId,
      items: order
    }
    const res = await Client.post(`/orders/${customerId}`, orderInfo)
    return res
  } catch (e) {
    console.error(e)
  }
}
