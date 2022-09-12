const router = require('express').Router()
const controllers = require('../controllers')
const middleware = require('../middleware')

router.get(
  '/',
  middleware.AdminMiddleware.stripToken,
  middleware.AdminMiddleware.verifyToken,
  controllers.OrderController.GetOrders
)

router.post(
  '/:customer_id',
  middleware.CustomerMiddleware.stripToken,
  middleware.CustomerMiddleware.verifyToken,
  controllers.OrderController.CreateOrder
)

module.exports = router
