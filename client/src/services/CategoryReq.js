import Client from './api'

export const GetCategories = async () => {
  try {
    const res = await Client.get('/category')
    return res.data
  } catch (e) {
    console.error(e)
  }
}
