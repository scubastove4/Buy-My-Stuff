const router = require('express').Router()
const controllers = require('../controllers')
const middleware = require('../middleware')

// router.get(
//   '/session',
//   middleware.CustomerMiddleware.stripToken,
//   middleware.CheckSessionMiddleware.verifySessionToken,
//   controllers.CustomerController.CheckSession
// )

router.post('/sign_up', controllers.CustomerController.SignUp)
router.post('/login', controllers.CustomerController.Login)

router.put(
  '/profile/email',
  middleware.CustomerMiddleware.stripToken,
  middleware.CustomerMiddleware.verifyToken,
  controllers.CustomerController.ChangeEmail
)
router.put(
  '/change/password',
  middleware.CustomerMiddleware.stripToken,
  middleware.CustomerMiddleware.verifyToken,
  controllers.CustomerController.ChangePassword
)

router.delete(
  '/:customer_id',
  middleware.CustomerMiddleware.stripToken,
  middleware.CustomerMiddleware.verifyToken,
  controllers.CustomerController.DeleteCustomer
)

module.exports = router
