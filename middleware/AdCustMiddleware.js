const jwt = require('jsonwebtoken')
require('dotenv').config()

const ADMIN_APP_SECRET = process.env.ADMIN_APP_SECRET
const CUSTOMER_APP_SECRET = process.env.CUSTOMER_APP_SECRET

const verifySessionToken = (req, res, next) => {
  const { token } = res.locals
  let payload =
    jwt.verify(token, ADMIN_APP_SECRET) ||
    jwt.verify(token, CUSTOMER_APP_SECRET)
  if (payload) {
    res.locals.payload = payload
    return next()
  }
  res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
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
