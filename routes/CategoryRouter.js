const router = require('express').Router()
const controllers = require('../controllers')
const middleware = require('../middleware')

router.get('/', controllers.CategoryControllers.GetAllCategories)
router.get('/:category_id', controllers.CategoryControllers.GetCategoryById)

router.post('/', controllers.CategoryControllers.CreateCategory)

router.put('/:category_id', controllers.CategoryControllers.UpdateCategory)

router.delete('/:category_id', controllers.CategoryControllers.DeleteCategory)

module.exports = router
