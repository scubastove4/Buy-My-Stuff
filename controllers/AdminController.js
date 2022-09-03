const { Admin } = require('../models')
const middleware = require('../middleware')

const SignUp = async (req, res) => {
  try {
    const { firstName, email, password } = req.body
    let existingAdmin = await Admin.findOne({ where: { email: email } })
    if (existingAdmin) {
      res.send({ msg: `${existingAdmin.email} already exists.` })
    } else {
      let passwordDigest = await middleware.hashPassword(password)
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
      (await middleware.comparePassword(
        req.body.password,
        admin.passwordDigest
      ))
    ) {
      let payload = {
        id: admin.id,
        email: admin.email,
        firstName: admin.firstName
      }
      let token = middleware.createToken(payload)
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
      return res.send({ status: 'Success', msg: 'Email udpated!' })
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
      (await middleware.comparePassword(
        req.body.oldPassword,
        admin.dataValues.passwordDigest
      ))
    ) {
      let passwordDigest = await middleware.hashPassword(req.body.newPassword)
      await admin.update({ passwordDigest })
      return res.send({ status: 'Success', msg: 'Password udpated!' })
    }
  } catch (e) {
    throw e
  }
}

const CheckSession = async (req, res) => {
  const { payload } = res.locals
  res.send(payload)
}

module.exports = {
  SignUp,
  Login,
  ChangeEmail,
  ChangePassword,
  CheckSession
}
