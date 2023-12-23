import Joi from 'joi'

const phoneNumber = Joi.string()
    .regex(/^[0-9 ]{8,16}$/)
    .required()
    .messages({
        'string.pattern.base': "Please enter a valid phone number"
    })

const loginPassword = Joi.string()
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/)
    .required()
    .messages({
        'string.pattern.base': "Please enter a valid password"
    })

const signupPasswordCriterion = {
    length: Joi.string().regex(/^.{6,20}$/).message({'string.pattern.base': 'Length must be between 6 - 20 characters'}),
    capitalLetter: Joi.string().regex(/[A-Z]/).message({'string.pattern.base': 'Must contain at least one upper case letter'}),
    lowerLetter: Joi.string().regex(/[a-z]/).message({'string.pattern.base': 'Must contain at least one lower case letter'}),
    digit: Joi.string().regex(/[0-9]/).message({'string.pattern.base': 'Must contain one digit'}),
    specialChar: Joi.string().regex(/[!@#$%&^]/).message({'string.pattern.base': 'Must contain one special character !@#$%^&*'})
}

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

export const phoneNumberValidation = Joi.object().keys({
    phoneNumber
})