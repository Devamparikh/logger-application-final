const logger = require('../logger/logger')
const User = require('../models/user')
const Message = require('../models/message')
const amqp = require('amqplib')

const {incrementRequestCounter} = require('../models/helper')

const randomNumberfunction = () => {
    const randomNumber = Math.floor(Math.random() * (60 - 1 + 1) + 1)
    return randomNumber
}




const pushMessage = async (req) => {
    logger.info('connecting to amqp')
    const connection = await amqp.connect('amqp://localhost:5672')
    const channel = await connection.createChannel()
    const QUEUE = 'dataValidator'
    logger.info('taking random number')
    const randomNumber = randomNumberfunction()

    logger.info('formatting msg array!')
    const msg = []
    req.body.forEach(element => {
        msg.push({id: req.user._id, username: req.user.username, message: element.message, randomNumber: randomNumber, token: req.token})
    });
    console.log(msg)

    logger.info('asserting Queue for msg array!')
    await channel.assertQueue(QUEUE)
    const sendToQueueResult = await channel.sendToQueue(QUEUE, Buffer.from(JSON.stringify(msg)))
    console.log("send" ,sendToQueueResult)

    if (sendToQueueResult) {

        userKey = 'user_' + req.user.username
        await incrementRequestCounter(userKey)
        let success = {}
        success.statusCode = 200
        success.message = 'data send to queue successful.'
        success.ok = true
        logger.info('data send to queue successful.')
        return {success, undefined} 
        // res.status(200).send({message: 'data send to queue successful.', ok: true})
    }else{
        let failuer = {}
        failuer.statusCode = 400
        failuer.message = 'no data send to queue!'
        failuer.ok = false
        logger.warn('no data send to queue!')
        return {undefined, failuer}
        // res.status(400).send({message: 'no data send to queue!', ok: false})
    }



}


module.exports = {pushMessage}