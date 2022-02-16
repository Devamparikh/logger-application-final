const express = require('express')
const swaggerUi = require('swagger-ui-express')
const app = express()

require('./src/db/mongoose')
require('./src/db/redis')
const userAuthentication = require('./src/routers/user-authentication')



app.use(express.json())
app.use(userAuthentication)

// swaggerDocument = require('./swagger.json')
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

module.exports = app