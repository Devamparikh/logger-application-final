const logger = require('../logger/logger')
const User = require('../models/user')
const Message = require('../models/message')
const {insertManyMessage, searchTextMessageModel, searchCategoryAndDateModel} = require('../models/helper')


const insertBulkMessage = async(req) => {
    logger.info('formate body array for adding requestId')
    req.body.forEach(element => {
        element.userId = req.user._id,
        element.requestId = req.header('CorrelationId')
    });
    logger.info('inserting in db')
    const bulkInsertResult = await insertManyMessage(req)
    bulkInsertResult.statusCode = 201
    // console.log("bulkInsertResult: ", bulkInsertResult);
    return bulkInsertResult
}

const searchByCategoryAndDate = async (req) => {
    logger.info('formating from and to date')
    const category = req.query.category
    const date = req.query.date
    const fromDate = new Date(date)
    const toDate = new Date(fromDate.getTime() + 86400000)

    if (!category || !date) {
        let failuer = {}
        failuer.statusCode = 400
        failuer.message = 'category and date required!'
        failuer.ok = false
        logger.warn('category and date required!')
        return {undefined, failuer}
        // return res.send({message: 'category and date required.', ok: false})
    }

    const message = await searchCategoryAndDateModel(category, fromDate, toDate)
    if(message == 0){
        let failuer = {}
        failuer.statusCode = 200
        failuer.message = 'No such message!'
        failuer.ok = true
        logger.warn('No such message in db!')
        return {undefined, failuer}
    }
    if(!message){
        let failuer = {}
        failuer.statusCode = 400
        failuer.message = 'No such message!'
        failuer.ok = false
        logger.warn('No such message in db')
        return {undefined, failuer}
    }
    let success = {}
    success.statusCode = 200
    success.message = message
    success.ok = true
    logger.info('returning success msg')
    return {success, undefined} 
}


const searchTextMessage = async(req) => {
    const searchMsg = req.query.searchMsg

    if(!searchMsg){
        let failuer = {}
        failuer.statusCode = 400
        failuer.message = 'Search Field Required!'
        failuer.ok = false
        logger.warn('Search Field Required!')
        return {undefined, failuer}
    }

    const message = await searchTextMessageModel(searchMsg)
    if(message.length < 1){
        let failuer = {}
        failuer.statusCode = 200
        failuer.message = 'No such message!'
        failuer.ok = true
        logger.warn('No such message in db')
        return {undefined, failuer}
    }
    if(!message){
        let failuer = {}
        failuer.statusCode = 400
        failuer.message = 'No such message!'
        failuer.ok = false
        logger.warn('No such message in db')
        return {undefined, failuer}
    }
    let success = {}
    success.statusCode = 200
    success.message = message
    success.ok = true
    logger.info('returning success msg')
    return {success, undefined} 

}



module.exports = {insertBulkMessage, searchTextMessage, searchByCategoryAndDate}