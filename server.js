const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const app = express()

const AppRouter = require('./routes/AppRouter')

const PORT = process.env.PORT || 3001

// const whitelist = [
//   'http://localhost:8080',
//   'https://buy-my-stuff-online.netlify.app'
// ]
// const corsOptions = {
//   origin: (origin, callback) => {
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

app.options('*', cors())
app.use(cors({ origin: '*', credentials: true }))
app.use(logger('dev'))
app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use('/api', AppRouter)

app.use('/uploads', express.static('./uploads'))

app.listen(PORT, () => console.log(`Server Running On Port: ${PORT}`))
