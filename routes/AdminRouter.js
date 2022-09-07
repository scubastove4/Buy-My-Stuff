const router = require('express').Router()
const controllers = require('../controllers')
const middleware = require('../middleware')

router.get(
  '/session',
  middleware.AdminMiddleware.stripToken,
  middleware.CheckSessionMiddleware.verifySessionToken,
  controllers.AdminController.CheckSession
)

router.post('/sign_up', controllers.AdminController.SignUp)
router.post('/login', controllers.AdminController.Login)

router.put(
  '/change/email',
  middleware.AdminMiddleware.stripToken,
  middleware.AdminMiddleware.verifyToken,
  controllers.AdminController.ChangeEmail
)
router.put(
  '/change/password',
  middleware.AdminMiddleware.stripToken,
  middleware.AdminMiddleware.verifyToken,
  controllers.AdminController.ChangePassword
)

router.delete(
  '/:admin_id',
  middleware.AdminMiddleware.stripToken,
  middleware.AdminMiddleware.verifyToken,
  controllers.AdminController.DeleteAdmin
)

module.exports = router
