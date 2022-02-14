const Joi = require('joi');


let message = Joi.object().keys({
    userMessage: Joi.string().required(),
    category: Joi.string().valid('Direct', 'Retried', 'Failed').required()
})

let bulkMessageSchema = Joi.array().items(message)





module.exports = {bulkMessageSchema}