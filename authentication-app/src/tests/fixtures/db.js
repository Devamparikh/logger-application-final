const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../models/user')


const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    username: 'devamparikh',
    password: 'devam1516'
}
const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    username: 'alphahere',
    password: 'alpha1516'
}

const setUpDatabase = async () => {
    await User.deleteMany()
    await new User(userOne).save()
    // await new User(userTwo).save()
}


module.exports = {setUpDatabase, userOne, userTwo}