const Joi = require("joi");

const loginValidation = (data)=> {
    const schema = Joi.object({
        email: Joi.string()
        .email()
        .messages({
            "string.email": "Please provide a valid email",
            "string.empty": "Email is required",
            "any.required": "Email is required",
        }),
        password: Joi.string()
        .min(8)
        .required()
        .messages({
            "string.min": "Password must be at least 8 characters",
            "string.empty": "Password is required",
            "any.required": "Password is required",
        })
    });
    return schema.validate(data)
}

module.exports = loginValidation;