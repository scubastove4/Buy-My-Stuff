const router = require('express').Router()
const AdminRouter = require('./AdminRouter')
const BookmarkRouter = require('./BookmarkRouter')
const CartRouter = require('./CartRouter')
const CategoryRouter = require('./CategoryRouter')
const CustomerRouter = require('./CustomerRouter')
const ItemRouter = require('./ItemRouter')
const CheckSessionRouter = require('./CheckSessionRouter')
const UserRouter = require('./UserRouter')

router.use('/admin', AdminRouter)
router.use('/bookmark', BookmarkRouter)
router.use('/cart', CartRouter)
router.use('/category', CategoryRouter)
router.use('/customer', CustomerRouter)
router.use('/item', ItemRouter)
router.use('/users', CheckSessionRouter)
router.use('/', CheckSessionRouter)

module.exports = router
