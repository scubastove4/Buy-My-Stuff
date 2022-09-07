const router = require('express').Router()
const controllers = require('../controllers')
const middleware = require('../middleware')

router.get(
  '/session',
  middleware.AdCustMiddleware.stripToken,
  middleware.AdCustMiddleware.verifySessionToken,
  controllers.CheckSessionController.CheckSession
)

module.exports = router
