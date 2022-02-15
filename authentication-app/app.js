const express = require('express')
const app = express()

require('./src/db/mongoose')
require('./src/db/redis')
const userAuthentication = require('./src/routers/user-authentication')

app.use(express.json())
app.use(userAuthentication)


module.exports = app