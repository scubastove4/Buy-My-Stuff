import Client from './api'

export const GetAllCustomers = async () => {
  try {
    const res = await Client.get('/users/customers')
    console.log(res)
    // return res.data
  } catch (e) {
    console.error(e)
  }
}

export const GetAllAdmins = async () => {
  try {
    const res = await Client.get('/users/admins')
    console.log(res)
    // return res.data
  } catch (e) {
    console.error(e)
  }
}
