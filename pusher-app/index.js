const app = require('./app')


const port = process.env.PUSHER_PORT || 3002

app.listen(port, () => {
    console.log('server is running on port ', port)
})