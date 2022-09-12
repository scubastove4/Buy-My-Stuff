import Client from './api'

export const GetAllOrders = async () => {
  try {
    const orders = await Client.get('/orders')
    console.log(orders)
  } catch (e) {
    console.error(e)
  }
}

export const CreateOrder = async (customerId, orderId, cart) => {
  try {
    console.log(orderId, cart)
    const orderInfo = {
      orderId: orderId,
      items: cart
    }
    await Client.post(`/orders/${customerId}`, orderInfo)
  } catch (e) {
    console.error(e)
  }
}
