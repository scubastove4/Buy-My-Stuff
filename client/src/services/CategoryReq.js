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
    const response = await Client.get(`/category/${categoryId}`)
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const PostCategory = async (data) => {
  try {
    const response = await Client.post('/category/', data)
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const DeleteCategory = async (categoryId) => {
  try {
    const response = await Client.delete(`/feats/${categoryId}`)
    return response.data
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
