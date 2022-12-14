import Client from './api'

export const GetCategories = async () => {
  try {
    const res = await Client.get('/category')
    return res.data
  } catch (e) {
    console.error(e)
  }
}

export const GetCategoryById = async (categoryId) => {
  try {
    const res = await Client.get(`/category/${categoryId}`)
    return res.data
  } catch (e) {
    console.error(e)
  }
}

export const PostCategory = async (data) => {
  try {
    const res = await Client.post('/category/', data)
    return res.data
  } catch (e) {
    console.error(e)
  }
}

export const UpdateCategory = async (categoryId, data) => {
  try {
    const res = await Client.put(`/category/${categoryId}`, data)
    return res.data
  } catch (e) {
    console.error(e)
  }
}

export const DeleteCategory = async (categoryId) => {
  try {
    await Client.delete(`/category/${categoryId}`)
  } catch (e) {
    console.error(e)
  }
}
