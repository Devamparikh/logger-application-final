const User = require('./user')
const client = require('../db/redis')



async function findOneByUsernameQuery(username, res) {
    const userPresent = await User.findOne({username: username})
    console.log("userPresent: ", userPresent);
        if (userPresent !== null) {return false}
        return true
}


async function insertNewUserQuery(body) {
    return await new User(body)
}

async function saveUserQuery(user) {
    return await user.save()
}


async function setJsonRedisQuery(userAfterSave) {
        const userKey = 'user_' + userAfterSave.username
        // console.log(userKey)
        await client.json.set(userKey, '.', { id:userAfterSave._id, username: userAfterSave.username, password: userAfterSave.password, requestCounter: 0 });
}

module.exports = {findOneByUsernameQuery, insertNewUserQuery, saveUserQuery, setJsonRedisQuery}