import Client from './api'

export const GetCartByCustomerId = async (customerId) => {
  try {
    const res = await Client.get(`/cart/${customerId}`)
    return res.data
  } catch (e) {
    console.error(e)
  }
}

export const PostCart = async (customerId, itemId) => {
  try {
    const res = await Client.post(`/cart/${customerId}/${itemId}`)
    return res.data
  } catch (e) {
    console.error(e)
  }
}

export const UpdateCartItem = async (cartItemId, quantity) => {
  try {
    const res = await Client.put(`/cart/${cartItemId}`, quantity)
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

export const DeleteWholeCart = async (customerId) => {
  try {
    console.log(customerId)
    await Client.delete(`/cart/customer/${customerId}`)
  } catch (e) {
    console.error(e)
  }
}
