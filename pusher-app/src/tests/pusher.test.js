const request = require('supertest')
const app = require('../../app')
const authapp = require('../../../authentication-app/app')

// const {setUpDatabase, userOne, userTwo} = require('./fixtures/db')
// setUpDatabase()

test('login to get token', async () => {
    const response = await request(authapp)
        .post('/user/login').send({
            "username":"devamparikh",
            "password": "devam1516"
        })
        .expect(200)
        console.log(response._body.token)
    
})

test('push message to queue', async () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjBiODAyM2YyNjBlOGFlNmNhMDE3ODEiLCJpYXQiOjE2NDQ5MjA5ODF9.0dOZMESPvcIqIlRAf15TFwV_C1iYa4dTPpgbWyUtNxg';
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
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjBiODAyM2YyNjBlOGFlNmNhMDE3ODEiLCJpYXQiOjE2NDQ5MjA5ODF9.0dOZMESPvcIqIlRAf15TFwV_C1iYa4dTPpgbWyUtNxg';
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