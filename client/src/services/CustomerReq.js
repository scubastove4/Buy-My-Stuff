import Client from './api'

export const GetAllCustomers = async () => {
  try {
    const res = await Client.get('/admin/all_customers')
    return res.data
  } catch (e) {
    console.error(e)
  }
}

export const SignUpCustomer = async (newUser) => {
  try {
    const res = await Client.post('/customer/sign_up', {
      firstName: newUser.value.firstName,
      email: newUser.value.email,
      password: newUser.value.password
    })
    return res.data
  } catch (e) {
    console.error(e)
  }
}

export const LoginCustomer = async (customer) => {
  try {
    const res = await Client.post('/customer/login', {
      email: customer.value.email,
      password: customer.value.password
    })
    localStorage.setItem('token', res.data.token)
    return res.data.customer
  } catch (e) {
    console.error(e)
  }
}

export const ChangeCustomerPassword = async (customerId, passwords) => {
  try {
    const res = await Client.put(
      `/customer/change/password/${customerId}`,
      passwords
    )
    return res.data
  } catch (e) {
    console.error(e)
  }
}

export const ChangeCustomerEmail = async (customerId, newEmail) => {
  try {
    const res = await Client.put(`/customer/change/email/${customerId}`, {
      newEmail: newEmail
    })
    return res.data
  } catch (e) {
    console.error(e)
  }
}

export const DeleteCustomer = async (customerId) => {
  try {
    await Client.delete(`/customer/${customerId}`)
  } catch (e) {
    console.error(e)
  }
}
