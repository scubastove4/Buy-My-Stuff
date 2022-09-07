const { Admin } = require('../models')
const middleware = require('../middleware')

const SignUp = async (req, res) => {
  try {
    const { firstName, email, password } = req.body
    let existingAdmin = await Admin.findOne({ where: { email: email } })
    if (existingAdmin) {
      res.send({ msg: `${existingAdmin.email} already exists.` })
    } else {
      let passwordDigest = await middleware.AdminMiddleware.hashPassword(
        password
      )
      const newAdmin = await Admin.create({
        firstName: firstName,
        email: email,
        passwordDigest: passwordDigest
      })
      res.send(newAdmin)
    }
  } catch (e) {
    throw e
  }
}

const Login = async (req, res) => {
  try {
    const admin = await Admin.findOne({
      where: { email: req.body.email },
      raw: true
    })
    if (
      admin &&
      (await middleware.AdminMiddleware.comparePassword(
        req.body.password,
        admin.passwordDigest
      ))
    ) {
      let payload = {
        id: admin.id,
        email: admin.email,
        firstName: admin.firstName,
        isAdmin: admin.isAdmin
      }
      let token = middleware.AdminMiddleware.createToken(payload)
      return res.send({ admin: payload, token })
    }
    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (e) {
    throw e
  }
}

const ChangeEmail = async (req, res) => {
  try {
    let admin = await Admin.findOne({
      where: { email: req.body.email }
    })
    if (admin) {
      await admin.update({ ...admin, email: req.body.newEmail })
      return res.send({
        status: 'Success',
        msg: `Email udpated to ${req.body.newEmail}!`
      })
    } else {
      return res.send({ status: 'Error', msg: 'Email not found' })
    }
  } catch (e) {
    throw e
  }
}

const ChangePassword = async (req, res) => {
  try {
    let admin = await Admin.findOne({
      where: { email: req.body.email }
    })
    if (
      admin &&
      (await middleware.AdminMiddleware.comparePassword(
        req.body.oldPassword,
        admin.dataValues.passwordDigest
      ))
    ) {
      let passwordDigest = await middleware.AdminMiddleware.hashPassword(
        req.body.newPassword
      )
      await admin.update({ passwordDigest })
      return res.send({ status: 'Success', msg: 'Password udpated!' })
    } else if (!admin) {
      return res.send({ status: 'Error', msg: 'Email not found' })
    } else {
      return res.send({ status: 'Error', msg: 'Incorrect password' })
    }
  } catch (e) {
    throw e
  }
}

const CheckSession = async (req, res) => {
  const { payload } = res.locals
  res.send(payload)
}

const DeleteAdmin = async (req, res) => {
  try {
    await Admin.destroy({ where: { id: req.params.admin_id } })
    res.send({
      msg: 'Admin removed',
      payload: req.params.admin_id,
      status: 'Ok'
    })
  } catch (error) {
    throw error
  }
}

module.exports = {
  SignUp,
  Login,
  ChangeEmail,
  ChangePassword,
  CheckSession,
  DeleteAdmin
}
