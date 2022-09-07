import Client from './api'

export const SignUpUser = async (data) => {
  try {
    const res = await Client.post('/user/sign_up', data)
    return res.data
  } catch (e) {
    console.error(e)
  }
}

export const LoginUser = async (data) => {
  try {
    const res = await Client.post('/user/login', data)
    localStorage.setItem('token', res.data.token)
    return res.data.user
  } catch (e) {
    console.error(e)
  }
}

export const CheckSession = async () => {
  try {
    const res = await Client.get('/user/session')
    return res.data
  } catch (e) {
    console.error(e)
  }
}

export const ChangePassword = async (data) => {
  try {
    const res = await Client.put('/user/profile', data)
    return res.data
  } catch (e) {
    console.error(e)
  }
}
