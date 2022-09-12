const router = require('express').Router()
const controllers = require('../controllers')
const middleware = require('../middleware')

router.post(
  '/submit-payment-intent',
  middleware.AdminMiddleware.stripToken,
  middleware.AdminMiddleware.verifyToken,
  controllers.PaymentController.SendPaymentIntent
)

module.exports = router
