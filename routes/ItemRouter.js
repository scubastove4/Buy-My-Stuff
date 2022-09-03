const router = require('express').Router()
const controllers = require('../controllers')
const middleware = require('../middleware')

router.get('/:item_id', controllers.ItemController.GetItemById)

router.post(
  '/',
  middleware.AdminMiddleware.stripToken,
  middleware.AdminMiddleware.verifyToken,
  controllers.ItemController.CreateItem
)

router.put(
  '/:item_id',
  middleware.AdminMiddleware.stripToken,
  middleware.AdminMiddleware.verifyToken,
  controllers.ItemController.UpdateItem
)

router.delete(
  '/:item_id',
  middleware.AdminMiddleware.stripToken,
  middleware.AdminMiddleware.verifyToken,
  controllers.ItemController.DeleteItem
)

module.exports = router
