const router = require('express').Router()
const controllers = require('../controllers')
const middleware = require('../middleware')

router.get(
  '/session',
  middleware.stripToken,
  middleware.verifyToken,
  controllers.AdminController.CheckSession
)

router.post('/sign_up', controllers.AdminController.SignUp)
router.post('/login', controllers.AdminController.Login)

router.put(
  '/change/email',
  middleware.stripToken,
  middleware.verifyToken,
  controllers.AdminController.ChangeEmail
)
router.put(
  '/change/password',
  middleware.stripToken,
  middleware.verifyToken,
  controllers.AdminController.ChangePassword
)

router.delete(
  '/:admin_id',
  middleware.stripToken,
  middleware.verifyToken,
  controllers.AdminController.DeleteAdmin
)

module.exports = router
