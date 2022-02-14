const Joi = require('joi');


let message = Joi.object().keys({
    message: Joi.string().required()
})

let bulkMessagePushSchema = Joi.array().items(message)





module.exports = {bulkMessagePushSchema}