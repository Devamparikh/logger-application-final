const request = require('supertest')
const app = require('../../app')
const { exitOnError } = require('../logger/logger')
const {fetchFromQueue} = require('../routers/data-validator')

test('consume msg', async () => {
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjBiODAyM2YyNjBlOGFlNmNhMDE3ODEiLCJpYXQiOjE2NDQ5MjM0MjF9.lZdEJR4b8gTm0dVdCjThEJO9jEe55bfLA8N5RNF0Ve8';
    expect(fetchFromQueue())
    
    
})