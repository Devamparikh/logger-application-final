const Joi = require('joi');


const userAuthSchema = Joi.object({
    username: Joi.string().min(5).max(15).required(),
    password: Joi.string().min(6).max(12).required()
});     

module.exports = {userAuthSchema}