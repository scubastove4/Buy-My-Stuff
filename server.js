const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const app = express()

const AppRouter = require('./routes/AppRouter')

const PORT = process.env.PORT || 3001

app.all('*', cors())
app.options('/*', function (req, res, next) {
  let allowedOrigins = [
    'http://www.buy-my-stuff-online.com',
    'https://www.buy-my-stuff-online.com',
    'https://buy-my-stuff-online.netlify.app',
    'http://localhost:8080'
  ] // list of url-s
  let origin = req.headers.origin
  if (allowedOrigins.indexOf(origin) > -1) {
    res.set({
      'Access-Control-Allow-Origin': `${origin}`,
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers':
        'Content-Type, Authorization, Content-Length, X-Requested-With, Via, X-Forwarded-For, X-Forwarded-Port, X-Forwarded-Proto, X-Request-Id, X-Request-Start'
    })
    console.log(res.header)
  }
  next()
})

app.use(cors())
app.use(logger('dev'))
app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use('/api', AppRouter)

app.use('/uploads', express.static('./uploads'))

app.listen(PORT, () => console.log(`Server Running On Port: ${PORT}`))
