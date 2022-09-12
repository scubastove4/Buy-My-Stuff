const router = require('express').Router()
const controllers = require('../controllers')
const middleware = require('../middleware')

router.post(
  '/submit-payment-intent',
  middleware.CustomerMiddleware.stripToken,
  middleware.CustomerMiddleware.verifyToken,
  controllers.PaymentController.SendPaymentIntent
)

module.exports = router
