const express = require('express')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const router = new express.Router()
// const Message = require('../models/message')
const logger = require('../logger/logger')
const auth = require('../middleware/auth')
// const {insertManyMessage} = require('../models/helper')
const {insertBulkMessage, searchTextMessage, searchByCategoryAndDate} = require('../services/bussiness-logic')
const {requestValidate} = require('../utils/payload-validation/request-validation')
const {bulkMessageSchema} = require('../utils/validation-schema/data-tracker-validate')


swaggerDocument = require('../../swagger.json')
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))


router.post('/data-tracker', auth, async (req, res) => {
    console.log(req.header("Authorization"));
//    console.log("header: ", req.headers.Authorization); 
    logger.info('bulk message insert request start')
    const reqValidateResult = requestValidate(req.body, bulkMessageSchema)

    if (reqValidateResult !== true) {
        logger.warn('validate request fail', reqValidateResult.message)
        return res.status(400).send({error: reqValidateResult.message,  ok:false})
    }


    try {
        logger.info('start insert business logic')
        const bulkInsertResult = await insertBulkMessage(req)
        console.log(bulkInsertResult);
        if(!bulkInsertResult){
            logger.warn('res send to user!')
            return res.status(400).send({error: bulkInsertResult.message, ok: false})  
        }
        logger.info('request ended res sent')
        res.status(bulkInsertResult.statusCode).send({result: bulkInsertResult[0], ok: true})

    } catch (error) {
        console.log(error)
        logger.error('Something went wrong while processing your request.')
        res.status(500).send({error: 'Something went wrong while processing your request.', ok: false})
    }
})


router.get('/data-tracker/searchmsg', auth, async (req, res) => {
    logger.info('search message request start')
    try {
        const {success, failuer} = await searchTextMessage(req)
        if (failuer) {
            logger.warn('res send to user!')
            return res.status(failuer.statusCode).send({message: failuer.message, ok: failuer.ok})
        }
        logger.info('request ended res sent')
        res.send({message: success.message, ok: success.ok})

    } catch (error) {
        console.log("e: ", error)
        logger.error('Something went wrong while processing your request.')
        res.status(500).send({error: 'Something went wrong while processing your request.', ok: false})
    }
})


router.get('/data-tracker/category', auth, async (req, res) => {
    logger.info('search message request start')
    try {
        const {success, failuer} = await searchByCategoryAndDate(req)
        if (failuer) {
            logger.warn('res send to user!')
            return res.status(failuer.statusCode).send({message: failuer.message, ok: failuer.ok})
        }
        logger.info('request ended res sent')
        res.send({message: success.message, ok: success.ok})

    } catch (error) {
        console.log("e: ", error)
        logger.error('Something went wrong while processing your request.')
        res.status(500).send({error: 'Something went wrong while processing your request.', ok: false})
    }
})


module.exports = router
