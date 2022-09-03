const router = require('express').Router()
const controllers = require('../controllers')
// const middleware = require('../middleware')

router.post('/', controllers.CartController.CreateCart)

router.delete('/:cart_id', controllers.CartController.DeleteCart)

module.exports = router
