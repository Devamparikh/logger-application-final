const request = require('supertest')
const app = require('../../app')
const authapp = require('../../../authentication-app/app')

// const {setUpDatabase, userOne, userTwo} = require('./fixtures/db')
// setUpDatabase()

test('login to get token', async () => {
    const response = await request(authapp)
        .post('/user/login').send({
            username: 'alphahere',
    password: 'alpha1516'
        })
        .expect(200)
        console.log("Token: ",response._body.token)
    
})

test('push message to queue', async () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjBkYzhkYTQ4NDdhMWQwOTA1YmRhNWMiLCJpYXQiOjE2NDUwNzEzNjl9.cnTewkxnMpio66qragvvfXuHLDN1rpm27kOkIg9-suA';
    const response = await request(app)
        .post('/data-pusher').set({'Authorization': `Bearer ${token}`}).send([
            {
                "message": "hello8"
            },
            {
                "message": "hello9"
            }
        ])
        .expect(200)
    
})

test('can not push message to queue if no msg provided.', async () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjBkYzhkYTQ4NDdhMWQwOTA1YmRhNWMiLCJpYXQiOjE2NDUwNzEzNjl9.cnTewkxnMpio66qragvvfXuHLDN1rpm27kOkIg9-suA';
    const response = await request(app)
        .post('/data-pusher').set({'Authorization': `Bearer ${token}`}).send([
            {
                
            },
            {
                "message": "hello9"
            }
        ])
        .expect(400)
    
})