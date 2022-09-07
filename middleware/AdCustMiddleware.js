const jwt = require('jsonwebtoken')
require('dotenv').config()

const ADMIN_APP_SECRET = process.env.ADMIN_APP_SECRET
const CUSTOMER_APP_SECRET = process.env.CUSTOMER_APP_SECRET

const verifySessionToken = async (req, res, next) => {
  const { token } = res.locals
  let payload
  try {
    payload = jwt.verify(token, ADMIN_APP_SECRET)
  } catch (e) {
    try {
      payload = jwt.verify(token, CUSTOMER_APP_SECRET)
    } catch (e) {
      res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
    }
  }
  if (payload) {
    console.log(payload)
    res.locals.payload = payload
    console.log(res.locals.payload)
    return next()
  }
}
const stripToken = (req, res, next) => {
  try {
    const token = req.headers['authorization'].split(' ')[1]
    if (token) {
      res.locals.token = token
      return next()
    }
  } catch (e) {
    res
  }
}

module.exports = {
  verifySessionToken,
  stripToken
}
