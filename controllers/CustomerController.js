const { Customer } = require('../models')
const middleware = require('../middleware')

const SignUp = async (req, res) => {
  try {
    const { firstName, email, password } = req.body
    let existingCustomer = await Customer.findOne({ where: { email: email } })
    if (existingCustomer) {
      res.send({ msg: `${existingCustomer.email} already exists.` })
    } else {
      let passwordDigest = await middleware.hashPassword(password)
      const newCustomer = await Customer.create({
        firstName: firstName,
        email: email,
        passwordDigest: passwordDigest
      })
      res.send(newCustomer)
    }
  } catch (e) {
    throw e
  }
}

const Login = async (req, res) => {
  try {
    const customer = await Customer.findOne({
      where: { email: req.body.email },
      raw: true
    })
    if (
      customer &&
      (await middleware.comparePassword(
        req.body.password,
        customer.passwordDigest
      ))
    ) {
      let payload = {
        id: customer.id,
        email: customer.email,
        firstName: customer.firstName
      }
      let token = middleware.createToken(payload)
      return res.send({ customer: payload, token })
    }
    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (e) {
    throw e
  }
}

const ChangeEmail = async (req, res) => {
  try {
    let customer = await Customer.findOne({
      where: { email: req.body.email }
    })
    if (customer) {
      await customer.update({ ...customer, email: req.body.newEmail })
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
    let customer = await Customer.findOne({
      where: { email: req.body.email }
    })
    if (
      customer &&
      (await middleware.comparePassword(
        req.body.oldPassword,
        customer.dataValues.passwordDigest
      ))
    ) {
      let passwordDigest = await middleware.hashPassword(req.body.newPassword)
      await customer.update({ passwordDigest })
      return res.send({ status: 'Success', msg: 'Password udpated!' })
    } else if (!customer) {
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

const DeleteCustomer = async (req, res) => {
  try {
    await Customer.destroy({ where: { id: req.params.customer_id } })
    res.send({
      msg: 'Customer removed',
      payload: req.params.customer_id,
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
  DeleteCustomer
}
