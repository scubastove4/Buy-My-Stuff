const { Admin, Customer } = require('../models')

const GetAllAdmins = async (req, res) => {
  try {
    const allAdmins = await Admin.findAll({
      attributes: ['firstName', 'email']
    })
    res.send(allAdmins)
  } catch (e) {
    throw e
  }
}

const GetAllCustomers = async (req, res) => {
  try {
    const allCustomers = await Customer.findAll({
      attributes: ['firstName', 'email']
    })
    res.send(allCustomers)
  } catch (e) {
    throw e
  }
}

module.exports = {
  GetAllAdmins,
  GetAllCustomers
}
