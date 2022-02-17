const request = require('supertest')
const app = require('../../app')
const authapp = require('../../../authentication-app/app')

// const {setUpDatabase, userOne, userTwo} = require('./fixtures/db')
// setUpDatabase()

// test('login to get token', async () => {
//     const response = await request(authapp)
//         .post('/user/login').send({
//             "username":"devamparikh",
//             "password": "devam1516"
//         })
//         .expect(200)
//         console.log(response._body.token)
// })


test('insert bulk message', async () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjBkYzhkYTQ4NDdhMWQwOTA1YmRhNWMiLCJpYXQiOjE2NDUwNzEzNjl9.cnTewkxnMpio66qragvvfXuHLDN1rpm27kOkIg9-suA';
    const response = await request(app)
        .post('/data-tracker').set({'Authorization': `Bearer ${token}`}).send([
            {
                "userMessage": "hello8",
                "category": "Direct"
            },
            {
                "userMessage": "hello9",
                "category": "Direct"
            }
        ])
        .expect(201)
    
})

test('insert wrong format in bulk message', async () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjBkYzhkYTQ4NDdhMWQwOTA1YmRhNWMiLCJpYXQiOjE2NDUwNzEzNjl9.cnTewkxnMpio66qragvvfXuHLDN1rpm27kOkIg9-suA';
    const response = await request(app)
        .post('/data-tracker').set({'Authorization': `Bearer ${token}`}).send([
            {
                "userMessage": "hello8"
            },
            {
                "userMessage": "hello9",
                "category": "Direct"
            }
        ])
        .expect(400)
    
})

test('search by text', async () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjBkYzhkYTQ4NDdhMWQwOTA1YmRhNWMiLCJpYXQiOjE2NDUwNzEzNjl9.cnTewkxnMpio66qragvvfXuHLDN1rpm27kOkIg9-suA';
    const response = await request(app)
        .get('/data-tracker/searchmsg').set({'Authorization': `Bearer ${token}`}).query({searchMsg: 'hi'}).send().expect(200)
    
})

test('no search parameter to search text', async () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjBkYzhkYTQ4NDdhMWQwOTA1YmRhNWMiLCJpYXQiOjE2NDUwNzEzNjl9.cnTewkxnMpio66qragvvfXuHLDN1rpm27kOkIg9-suA';
    const response = await request(app)
        .get('/data-tracker/searchmsg').set({'Authorization': `Bearer ${token}`}).query().send().expect(400)
    
})

test('search by date and category', async () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjBkYzhkYTQ4NDdhMWQwOTA1YmRhNWMiLCJpYXQiOjE2NDUwNzEzNjl9.cnTewkxnMpio66qragvvfXuHLDN1rpm27kOkIg9-suA';
    const response = await request(app)
        .get('/data-tracker/category').set({'Authorization': `Bearer ${token}`}).query({category:'Direct', date:'2022-02-09'}).send().expect(200)
    
})

test('no search parameter to search date and category', async () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjBkYzhkYTQ4NDdhMWQwOTA1YmRhNWMiLCJpYXQiOjE2NDUwNzEzNjl9.cnTewkxnMpio66qragvvfXuHLDN1rpm27kOkIg9-suA';
    const response = await request(app)
        .get('/data-tracker/searchmsg').set({'Authorization': `Bearer ${token}`}).query().send().expect(400)
})