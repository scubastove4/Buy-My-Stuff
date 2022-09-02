const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const app = express()

const CustomerRouter = require('./routes/CustomerRouter')
const CategoryRouter = require('./routes/CategoryRouter')
const AdminRouter = require('./routes/AdminRouter')
const ItemRouter = require('./routes/ItemRouter')

const PORT = process.env.PORT || 3001

app.use(cors())
app.use(logger('dev'))
app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use('/admin', AdminRouter)
app.use('/api/customer', CustomerRouter)
app.use('/api/category', CategoryRouter)
app.use('/api/item', ItemRouter)

app.use('/uploads', express.static('./uploads'))

app.listen(PORT, () => console.log(`Server Running On Port: ${PORT}`))
