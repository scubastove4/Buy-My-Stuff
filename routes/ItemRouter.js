const router = require('express').Router()
const controllers = require('../controllers')
// const middleware = require('../middleware')

router.get('/:item_id', controllers.ItemController.GetItemById)

router.post('/', controllers.ItemController.CreateItem)

router.put('/:item_id', controllers.ItemController.UpdateItem)

router.delete('/:item_id', controllers.ItemController.DeleteItem)

module.exports = router
