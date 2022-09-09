import Client from './api'

export const GetAllAdmins = async () => {
  try {
    const res = await Client.get('/admin/all_admins')
    return res.data
  } catch (e) {
    console.error(e)
  }
}

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

export const ChangeAdminPassword = async (data) => {
  try {
    const res = await Client.put('/admin/profile', data)
    return res.data
  } catch (e) {
    console.error(e)
  }
}

export const DeleteAdmin = async (adminObj) => {
  if (adminObj.admins === 1) return
  try {
    await Client.delete(`/admin/${adminObj.adminId}`)
  } catch (e) {
    console.error(e)
  }
}
