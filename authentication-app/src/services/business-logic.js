const logger = require('../logger/logger')
const User = require('../models/user')
const {findOneByUsernameQuery, insertNewUserQuery, saveUserQuery, setJsonRedisQuery} = require('../models/helper')

const registerUser = async(req) => {
    logger.info('checking if similar username exist in db')
        const findResult = await findOneByUsernameQuery(req.body.username)
        console.log(findResult);
        if (findResult !== true) {
        const failuer = {}
        logger.warn('similar username exist in db')
        failuer.statusCode = 409
        failuer.message = 'username already present in database'
        console.log(failuer)
        return {undefined, failuer}
        }
    logger.info('insert New User Query')
    const user = await insertNewUserQuery(req.body)
    // console.log(user)
    logger.info('save New User Query')
    const userAfterSave = await saveUserQuery(user)
    // console.log("userAfterSave: ", userAfterSave)
    logger.info(' New User set Json Redis Query')
    await setJsonRedisQuery(userAfterSave)
    logger.info(' generate Auth Token')
    const token = await user.generateAuthToken(userAfterSave)
    return {user, undefined}
}

const userLogin = async (req) => {
    const user = await User.findByCredentials(req.body.username, req.body.password)
    logger.info("user: ", user)
    logger.info(' generate Auth Token')
    const token = await user.generateAuthToken(user)
    logger.info("token: ", token)
    return {user, token}
}

module.exports = {registerUser, userLogin}