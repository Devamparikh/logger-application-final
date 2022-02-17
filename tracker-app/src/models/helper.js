const User = require('./user')
const Message = require('./message')
const client = require('../db/redis')

const insertManyMessage = async(req) => {
    console.log(req.body);
    const insertResult = await Message.insertMany(req.body)
    return insertResult
    // console.log(insertResult);
}

const searchTextMessageModel = async(searchMsg) => {
    const message = await Message.find({ "userMessage" : { $regex: searchMsg } }, {userMessage: 1})
    return message
    // console.log(insertResult);
}

const searchCategoryAndDateModel = async (category, fromDate, toDate) => {
    const message = await Message.find({ "category" : category, "createdTime": {$gte: fromDate, $lt: toDate } }).count()
    return message
}

module.exports = {insertManyMessage, searchTextMessageModel, searchCategoryAndDateModel}




// , (error, result) => {
//     console.log('hello');
//     if (error) {
//         console.log(error._message)
//         return { ok: false, error: error._message }
//         // return res.status(400).send({error: error._message, ok: false})  
//     }
//     return { result: result, ok: true, statusCode: 201 }
// }