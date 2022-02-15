const app = require('./app')


const port = process.env.AUTHENTICATION_PORT 

app.listen(port, () => {
    console.log('server is running on port ', port)
})