const express = require('express')
// const client = require('../db/redis')
// const User = require('../models/user')
const logger = require('../logger/logger')
const {requestValidate} = require('../utils/payload-validate/request-validation')
const {userAuthSchema} = require('../utils/validation-schema/user-auth-validate')
const {registerUser, userLogin} = require('../services/business-logic')
// const {findOneByUsernameQuery, insertNewUserQuery, saveUserQuery, setJsonRedisQuery} = require('../models/helper')
const router = new express.Router()




router.post('/user/register', async (req, res) => {
    logger.info('register user and validate request route start.')
    const reqValidateResult = requestValidate(req.body, userAuthSchema)

    if (reqValidateResult !== true) {
        logger.warn('validate request fail', reqValidateResult.message)
        return res.status(400).send({error: reqValidateResult.message,  ok:false})
    }

    try {

        const {user, failuer} = await registerUser(req)
        console.log(failuer)
        if (failuer) {
            logger.warn('similar username exist in db')
            return res.status(failuer.statusCode).send({error: failuer.message, ok:false})
            
        }
        console.log(user)
        if (user == null) {
            logger.error('enexpected register user fail', error)
            throw new Error('enexpected error')
        }
        logger.info(' end of request')
        res.status(201).send({'user': user._id,  'ok':true})
    } catch (error) {
        // console.log(error)
        logger.error('register user fail', error)
        res.status(500).send({error: 'Something went wrong while processing your request.', ok:false})
    }
})

router.post('/user/login', async (req, res) => {

    try {
        logger.info("user login request start")
        const reqValidateResult = requestValidate(req.body, userAuthSchema)
        if (reqValidateResult !== true) {
            logger.warn('validate request fail', reqValidateResult.message)
            return res.status(400).send({error: reqValidateResult.message,  ok:false})
        }

        const {user, token} = await userLogin(req)
        if(user == null || token == null){
            logger.error('enexpected register user fail', error)
            throw new Error('enexpected error')
        }
        logger.info(' end of request')
        res.status(200).send({user, token, 'ok':true})
    } catch (error) {
        // console.log(error.message)
        logger.error('login user fail', error)
        res.status(500).send({error: 'Something went wrong while processing your request.', ok:false})
    }
})


module.exports = router