const router = require('express').Router()
const controllers = require('../controllers')
const middleware = require('../middleware')

router.get(
  '/session',
  middleware.stripToken,
  middleware.verifyToken,
  controllers.CustomerController.CheckSession
)

router.post('/sign_up', controllers.CustomerController.SignUp)
router.post('/login', controllers.CustomerController.Login)

router.put(
  '/profile/email',
  middleware.stripToken,
  middleware.verifyToken,
  controllers.CustomerController.ChangeEmail
)
router.put(
  '/profile/password',
  middleware.stripToken,
  middleware.verifyToken,
  controllers.CustomerController.ChangePassword
)

router.delete(
  '/:customer_id',
  middleware.stripToken,
  middleware.verifyToken,
  controllers.CustomerController.DeleteCustomer
)

module.exports = router
