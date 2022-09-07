import Client from './api'

export const CheckSession = async () => {
  try {
    let res = await Client.get('/admin/session')
    if (res) {
      return res.data
    } else {
      res = await Client.get('/customer/session')
      return res.data
    }
  } catch (e) {
    console.error(e)
  }
}
