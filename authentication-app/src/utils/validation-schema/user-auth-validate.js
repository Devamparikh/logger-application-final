const Joi = require('joi');


const userAuthSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().max(12).required()
});     

module.exports = {userAuthSchema}