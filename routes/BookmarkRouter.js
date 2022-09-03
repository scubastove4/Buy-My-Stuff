const router = require('express').Router()
const controllers = require('../controllers')
const middleware = require('../middleware')

router.post(
  '/',
  middleware.CustomerMiddleware.stripToken,
  middleware.CustomerMiddleware.verifyToken,
  controllers.BookmarkController.CreateBookmark
)

router.delete(
  '/:bookmark_id',
  middleware.CustomerMiddleware.stripToken,
  middleware.CustomerMiddleware.verifyToken,
  controllers.BookmarkController.DeleteBookmark
)

module.exports = router
