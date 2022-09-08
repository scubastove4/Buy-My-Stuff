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
    let formData = new FormData()
    formData.append('name', data.name)
    formData.append('image', data.image)
    formData.append('price', data.price)
    formData.append('description', data.description)
    formData.append('categoryId', data.categoryId)
    formData.append('adminId', data.adminId)
    const res = await Client.post('/item/', formData)
    return res.data
  } catch (e) {
    console.error(e)
  }
}

export const UpdateItem = async (itemId, data) => {
  try {
    let formData = new FormData()
    formData.append('name', data.name)
    formData.append('image', data.image)
    formData.append('price', data.price)
    formData.append('description', data.description)
    formData.append('categoryId', data.categoryId)
    formData.append('adminId', data.adminId)
    const res = await Client.put(`/item/${itemId}`, formData)
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
