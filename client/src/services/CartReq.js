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

export const UpdateCart = async (data) => {
  try {
    const res = await Client.put(`/cart`, data)
    return res.data
  } catch (e) {
    console.error(e)
  }
}

export const DeleteCartItem = async (cartItemId) => {
  try {
    await Client.delete(`/cart/${cartItemId}`)
  } catch (e) {
    console.error(e)
  }
}
