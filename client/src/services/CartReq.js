import Client from './api'

export const GetCartByCustomerId = async (customerId) => {
  try {
    const res = await Client.get(`/cart/${customerId}`)
    return res.data
  } catch (e) {
    console.error(e)
  }
}

export const PostCart = async (data) => {
  try {
    const res = await Client.post('/cart/', data.value)
    return res.data
  } catch (e) {
    console.error(e)
  }
}

export const UpdateCart = async (cartId, data) => {
  try {
    const res = await Client.put(`/cart/${cartId}`, data)
    return res.data
  } catch (e) {
    console.error(e)
  }
}

export const DeleteCartItem = async (removedItem) => {
  try {
    await Client.delete('/cart', { data: removedItem })
  } catch (e) {
    console.error(e)
  }
}
