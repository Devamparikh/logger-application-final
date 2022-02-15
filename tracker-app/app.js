const express = require('express')
const app = express()

require('./src/db/mongoose')
require('./src/db/redis')

const dataTracker = require('./src/routers/data-tracker')

app.use(express.json())
app.use(dataTracker)


module.exports = app