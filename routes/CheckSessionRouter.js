const router = require('express').Router()
const controllers = require('../controllers')
const middleware = require('../middleware')

/////    created middleware to check if admin then if customer, if admin check fails
router.get(
  '/session',
  middleware.AdCustMiddleware.stripToken,
  middleware.AdCustMiddleware.verifySessionToken,
  controllers.CheckSessionController.CheckSession
)

module.exports = router
