const router = require('express').Router()
const controllers = require('../controllers')
const middleware = require('../middleware')

router.get(
  '/all_admins',
  middleware.AdminMiddleware.stripToken,
  middleware.AdminMiddleware.verifyToken,
  controllers.AdminController.GetAllAdmins
)

router.get(
  '/all_customers',
  middleware.AdminMiddleware.stripToken,
  middleware.AdminMiddleware.verifyToken,
  controllers.CustomerController.GetAllCustomers
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
