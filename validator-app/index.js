const app = require('./app')


const port = process.env.VALIDATOR_PORT || 3003

app.listen(port, () => {
    console.log('server is running on port ', port)
})