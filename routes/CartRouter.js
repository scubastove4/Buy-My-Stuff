const router = require('express').Router()
const controllers = require('../controllers')
const middleware = require('../middleware')

router.post(
  '/',
  middleware.CustomerMiddleware.stripToken,
  middleware.CustomerMiddleware.verifyToken,
  controllers.CartController.CreateCart
)

router.delete(
  '/:cart_id',
  middleware.CustomerMiddleware.stripToken,
  middleware.CustomerMiddleware.verifyToken,
  controllers.CartController.DeleteCart
)

module.exports = router
