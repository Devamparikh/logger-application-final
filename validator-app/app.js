const express = require('express')
const app = express()

require('./src/db/mongoose')
require('./src/db/redis')
require('./src/routers/data-validator')

app.use(express.json())

module.exports = app