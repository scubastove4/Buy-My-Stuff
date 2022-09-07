import Client from './api'
import { user } from '../App.vue'

export const SignUpAdmin = async (data) => {
  try {
    const res = await Client.post('/admin/sign_up', {
      firstName: data.value.firstName,
      email: data.value.email,
      password: data.value.password
    })
    return res.data
  } catch (e) {
    console.error(e)
  }
}

export const LoginAdmin = async (data) => {
  try {
    const res = await Client.post('/admin/login', {
      email: data.value.email,
      password: data.value.password
    })
    localStorage.setItem('token', res.data.token)
    // console.log(res.data.admin)
    return res.data.admin
  } catch (e) {
    console.error(e)
  }
}

export const CheckAdminSession = async () => {
  try {
    const res = await Client.get('/admin/session')
    return res.data
  } catch (e) {
    console.error(e)
  }
}

export const ChangeAdminPassword = async (data) => {
  try {
    const res = await Client.put('/admin/profile', data)
    return res.data
  } catch (e) {
    console.error(e)
  }
}
