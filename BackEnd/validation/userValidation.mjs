import Joi from 'joi'

const passwordErrorMessage = 'Must be between 6 - 16 characters, have at least one capital letter, one lowercase letter, one digit, and one special character'

const phoneNumber = Joi.string()
    .regex(/^[0-9]{8,16}$/)
    .required()
    .messages({
        'string.pattern.base': "Please enter a valid phone number"
    })

const password = Joi.string()
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
    .required()
    .messages({
        'string.pattern.base': passwordErrorMessage
    })

const firstName = Joi.string()
    .regex(/^[A-Za-z]+$/)
    .required()
    .messages({
        'string.pattern.base': "Please enter a valid name"
    })

const lastName = Joi.string()
    .regex(/^[A-Za-z]+$/)
    .required()
    .messages({
        'string.pattern.base': "Please enter a valid name"
    })

export const signUpValidation = Joi.object().keys({
    phoneNumber,
    password,
    firstName, //First name
    lastName, //Last name
})

export const loginValidation = Joi.object().keys({
    phoneNumber,
    password,
})