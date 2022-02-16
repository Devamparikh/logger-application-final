const express = require('express')
const amqp = require('amqplib')
// const {createClient} = require('redis');
const client = require('../db/redis')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const router = new express.Router()
// const Message = require('../src/models/message')
const auth = require('../middleware/auth')
const logger = require('../logger/logger')
const {requestValidate} = require('../utils/payload-validate/request-validation')
const {bulkMessagePushSchema} = require('../utils/validation-schema/data-pusher-validate')
const {pushMessage} = require('../services/business-logic')


swaggerDocument = require('../../swagger.json')
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

router.post('/data-pusher', auth, async (req, res) => {
    try {
        logger.info('data pusher request start')
        const reqValidateResult = requestValidate(req.body, bulkMessagePushSchema)
    
        if (reqValidateResult !== true) {
            logger.warn('validate request fail', reqValidateResult.message)
            return res.status(400).send({error: reqValidateResult.message,  ok:false})
        }

        const {success, failuer} = await pushMessage(req)
        if (failuer) {
            logger.warn('res send to user!')
            return res.status(failuer.statusCode).send({message: failuer.message, ok: failuer.ok})
        }
        res.status(success.statusCode).send({message: success.message, ok: success.ok})
        

    } catch (error) {
        console.log(error)
        logger.error('Something went wrong while processing your request')
        res.status(500).send({error: 'Something went wrong while processing your request.', ok: false})
    }
})





module.exports = router