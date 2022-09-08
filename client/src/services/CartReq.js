import Client from './api'

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

export const DeleteCart = async (cartId) => {
  try {
    await Client.delete(`/cart/${cartId}`)
  } catch (e) {
    console.error(e)
  }
}
