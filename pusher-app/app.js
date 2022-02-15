const express = require('express')
const app = express()

require('./src/db/mongoose')
require('./src/db/redis')
const dataPusher = require('./src/routers/data-pusher')

app.use(express.json())
app.use(dataPusher)

module.exports = app