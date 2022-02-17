const User = require('./user')
const client = require('../db/redis')



const findOneByUsernameQuery = async(username, res) => {
    const userPresent = await User.findOne({username: username})
    console.log("userPresent: ", userPresent);
        if (userPresent !== null) {return false}
        return true
}


const insertNewUserQuery = async(body) => {
    return await new User(body)
}

const saveUserQuery = async (user) => {
    return await user.save()
}


const setJsonRedisQuery = async(userAfterSave) => {
        const userKey = 'user_' + userAfterSave.username
        // console.log(userKey)
        await client.json.set(userKey, '.', { id:userAfterSave._id, username: userAfterSave.username, password: userAfterSave.password, requestCounter: 0 });
}

module.exports = {findOneByUsernameQuery, insertNewUserQuery, saveUserQuery, setJsonRedisQuery}