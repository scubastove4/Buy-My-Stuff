const router = require('express').Router()
const controllers = require('../controllers')
const middleware = require('../middleware')

////////  attempting to combine express/axio reqs to post or delete if exists already
// router.all(
//   '/',
//   middleware.CustomerMiddleware.stripToken,
//   middleware.CustomerMiddleware.verifyToken,
//   controllers.BookmarkController.ToggleBookmark
// )

router.get(
  '/:customer_id',
  middleware.CustomerMiddleware.stripToken,
  middleware.CustomerMiddleware.verifyToken,
  controllers.BookmarkController.GetCustomerBookmark
)

router.post(
  '/',
  middleware.CustomerMiddleware.stripToken,
  middleware.CustomerMiddleware.verifyToken,
  controllers.BookmarkController.CreateBookmark
)

router.delete(
  '/',
  middleware.CustomerMiddleware.stripToken,
  middleware.CustomerMiddleware.verifyToken,
  controllers.BookmarkController.DeleteBookmark
)

module.exports = router
