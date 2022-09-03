const router = require('express').Router()
const controllers = require('../controllers')
// const middleware = require('../middleware')

router.post('/', controllers.BookmarkController.CreateBookmark)

router.delete('/:bookmark_id', controllers.BookmarkController.DeleteBookmark)

module.exports = router
