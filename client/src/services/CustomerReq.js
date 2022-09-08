import Client from './api'

export const SignUpCustomer = async (data) => {
  try {
    const res = await Client.post('/customer/sign_up', {
      firstName: data.value.firstName,
      email: data.value.email,
      password: data.value.password
    })
    return res.data
  } catch (e) {
    console.error(e)
  }
}

export const LoginCustomer = async (data) => {
  try {
    const res = await Client.post('/customer/login', {
      email: data.value.email,
      password: data.value.password
    })
    localStorage.setItem('token', res.data.token)
    return res.data.customer
  } catch (e) {
    console.error(e)
  }
}

export const ChangeCustomerPassword = async (data) => {
  try {
    const res = await Client.put('/customer/profile', data)
    return res.data
  } catch (e) {
    console.error(e)
  }
}
