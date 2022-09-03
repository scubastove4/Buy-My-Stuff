const router = require('express').Router()
const AdminRouter = require('./AdminRouter')
// const BookmarkRouter = require('./BookmarkRouter')
// const CartRouter = require('./CartRouter')
const CategoryRouter = require('./CategoryRouter')
const CustomerRouter = require('./CustomerRouter')
const ItemRouter = require('./ItemRouter')

router.use('/admin', AdminRouter)
// router.use('/bookmark', BookmarkRouter)
// router.use('/cart', CartRouter)
router.use('/category', CategoryRouter)
router.use('/customer', CustomerRouter)
router.use('/item', ItemRouter)

module.exports = router
