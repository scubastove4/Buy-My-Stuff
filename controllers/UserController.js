const { Admin, Customer } = require('../models')

const GetAllAdmins = async () => {
  try {
    const allAdmins = await Admin.findAll()
    console.log(allAdmins)
  } catch (e) {
    throw e
  }
}

const GetAllCustomers = async () => {
  try {
    const allCustomers = await Customer.findAll()
    console.log(allCustomers)
  } catch (e) {
    throw e
  }
}

module.exports = {
  GetAllAdmins,
  GetAllCustomers
}
