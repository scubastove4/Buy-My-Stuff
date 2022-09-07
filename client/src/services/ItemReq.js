import Client from './api'

export const GetItems = async () => {
  try {
    const res = await Client.get('/item')
    return res.data
  } catch (e) {
    console.error(e)
  }
}

export const GetItemById = async (itemId) => {
  try {
    const res = await Client.get(`/item/${itemId}`)
    return res.data
  } catch (e) {
    console.error(e)
  }
}

export const PostItem = async (data) => {
  try {
    const res = await Client.post('/item/', data)
    return res.data
  } catch (e) {
    console.error(e)
  }
}

export const UpdateItem = async (itemId, data) => {
  try {
    const res = await Client.put(`/item/${itemId}`, data)
    return res.data
  } catch (e) {
    console.error(e)
  }
}

export const DeleteItem = async (itemId) => {
  try {
    await Client.delete(`/item/${itemId}`)
  } catch (e) {
    console.error(e)
  }
}
