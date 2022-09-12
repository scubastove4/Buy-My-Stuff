const router = require('express').Router()
const controllers = require('../controllers')
const middleware = require('../middleware')

router.get(
  '/:customer_id',
  middleware.CustomerMiddleware.stripToken,
  middleware.CustomerMiddleware.verifyToken,
  controllers.CartController.GetCustomerCart
)

router.post(
  '/',
  middleware.CustomerMiddleware.stripToken,
  middleware.CustomerMiddleware.verifyToken,
  controllers.CartController.CreateCartItem
)

router.put(
  '/:cart_item_id',
  middleware.CustomerMiddleware.stripToken,
  middleware.CustomerMiddleware.verifyToken,
  controllers.CartController.UpdateCartItemQuantity
)

router.delete(
  '/:cart_item_id',
  middleware.CustomerMiddleware.stripToken,
  middleware.CustomerMiddleware.verifyToken,
  controllers.CartController.DeleteCartItem
)

router.delete(
  '/customer/:customerId',
  middleware.CustomerMiddleware.stripToken,
  middleware.CustomerMiddleware.verifyToken,
  controllers.CartController.DeleteWholeCart
)

module.exports = router
