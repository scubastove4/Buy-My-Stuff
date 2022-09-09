import Client from './api'

export const GetBookmarksByUserId = async (customerId) => {
  try {
    const res = await Client.get(`/bookmark/${customerId}`)
    return res.data
  } catch (e) {
    console.error(e)
  }
}

export const PostBookmark = async (data) => {
  try {
    const res = await Client.post('/bookmark/', data.value)
    return res.data
  } catch (e) {
    console.error(e)
  }
}

export const DeleteBookmark = async (bookmarkId) => {
  try {
    await Client.delete(`/bookmark/${bookmarkId}`)
  } catch (e) {
    console.error(e)
  }
}
