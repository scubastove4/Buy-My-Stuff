const router = require('express').Router()
const controllers = require('../controllers')
const middleware = require('../middleware')

router.get('/customers', controllers.UserController.GetAllCustomers)
router.get('/admins', controllers.UserController.GetAllAdmins)

module.exports = router
