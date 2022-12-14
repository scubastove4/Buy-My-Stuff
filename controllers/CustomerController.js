const { Customer } = require('../models')
const middleware = require('../middleware')

const GetAllCustomers = async (req, res) => {
  try {
    const allCustomers = await Customer.findAll({
      attributes: ['id', 'firstName', 'email']
    })
    res.send(allCustomers)
  } catch (e) {
    throw e
  }
}

const SignUp = async (req, res) => {
  try {
    const { firstName, email, password } = req.body
    let existingCustomer = await Customer.findOne({ where: { email: email } })
    if (existingCustomer) {
      res.send({ msg: `${existingCustomer.email} already exists.` })
    } else {
      let passwordDigest = await middleware.CustomerMiddleware.hashPassword(
        password
      )
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
      (await middleware.CustomerMiddleware.comparePassword(
        req.body.password,
        customer.passwordDigest
      ))
    ) {
      let payload = {
        id: customer.id,
        email: customer.email,
        firstName: customer.firstName,
        isAdmin: customer.isAdmin
      }
      let token = middleware.CustomerMiddleware.createToken(payload)
      return res.send({ customer: payload, token })
    }
    res.status(401).send({ status: 'e', msg: 'Unauthorized' })
  } catch (e) {
    throw e
  }
}

const ChangeEmail = async (req, res) => {
  try {
    const { newEmail } = req.body
    let existingCustomer = await Customer.findOne({
      where: { email: newEmail }
    })
    if (existingCustomer) {
      res.send({ msg: `${existingCustomer.email} already exists.` })
    } else {
      let customer = await Customer.findByPk(req.params.customer_id)
      if (customer) {
        await customer.update({ ...customer, email: req.body.newEmail })
        return res.send({
          status: 'Success',
          msg: `Email udpated to ${req.body.newEmail}!`
        })
      }
    }
  } catch (e) {
    throw e
  }
}

const ChangePassword = async (req, res) => {
  try {
    let customer = await Customer.findByPk(req.params.customer_id)
    if (
      customer &&
      (await middleware.CustomerMiddleware.comparePassword(
        req.body.oldPassword,
        customer.dataValues.passwordDigest
      ))
    ) {
      let passwordDigest = await middleware.CustomerMiddleware.hashPassword(
        req.body.newPassword
      )
      await customer.update({ passwordDigest })
      return res.send({ status: 'Success', msg: 'Password udpated!' })
    } else if (!customer) {
      return res.send({ status: 'e', msg: 'Email not found' })
    } else {
      return res.send({ status: 'e', msg: 'Incorrect password' })
    }
  } catch (e) {
    throw e
  }
}

const DeleteCustomer = async (req, res) => {
  try {
    await Customer.destroy({ where: { id: req.params.customer_id } })
    res.send({
      msg: 'Customer removed',
      payload: req.params.customer_id,
      status: 'Ok'
    })
  } catch (e) {
    throw e
  }
}

module.exports = {
  GetAllCustomers,
  SignUp,
  Login,
  ChangeEmail,
  ChangePassword,
  DeleteCustomer
}
