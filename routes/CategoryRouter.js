const router = require('express').Router()
const controllers = require('../controllers')
const middleware = require('../middleware')

router.get('/', controllers.CategoryControllers.GetAllCategories)
router.get('/:category_id', controllers.CategoryControllers.GetCategoryById)

router.post(
  '/',
  middleware.AdminMiddleware.stripToken,
  middleware.AdminMiddleware.verifyToken,
  controllers.CategoryControllers.CreateCategory
)

router.put(
  '/:category_id',
  middleware.AdminMiddleware.stripToken,
  middleware.AdminMiddleware.verifyToken,
  controllers.CategoryControllers.UpdateCategory
)

router.delete(
  '/:category_id',
  middleware.AdminMiddleware.stripToken,
  middleware.AdminMiddleware.verifyToken,
  controllers.CategoryControllers.DeleteCategory
)

module.exports = router
