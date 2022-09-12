const router = require('express').Router()
const controllers = require('../controllers')
const middleware = require('../middleware')

router.post(
  '/submit-payment-intent',
  middleware.CustomerMiddleware.stripToken,
  middleware.CustomerMiddleware.verifyToken,
  controllers.PaymentController.SendPaymentIntent
)

router.post(
  '/confirm-payment-intent',
  middleware.CustomerMiddleware.stripToken,
  middleware.CustomerMiddleware.verifyToken,
  controllers.PaymentController.ConfirmPaymentIntent
)

module.exports = router
