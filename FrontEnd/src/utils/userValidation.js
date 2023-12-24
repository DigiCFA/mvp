import Joi from 'joi'

export const firstName = Joi.string()
    .regex(/^[A-Za-z]+$/)
    .required()
    .error(() => Error("Please enter a valid first name"))

export const lastName = Joi.string()
    .regex(/^[A-Za-z]+$/)
    .required()
    .error(() => Error("Please enter a valid last name"))

export const loginPassword = Joi.string()
    .regex(/^.+$/)
    .required()
    .error(() => Error('Password is required'))

export const phoneNumberValidation = Joi.string()
    .regex(/^[0-9 ]{8,16}$/)
    .required()
    .error(() => Error('Please enter a valid phone number'))

export const signupPassword = [
    Joi.string().regex(/^.{6,20}$/).error(() => Error('Length must be between 6 - 20 characters')),
    Joi.string().regex(/[A-Z]/).error(() => Error('Must contain at least one upper case letter')),
    Joi.string().regex(/[a-z]/).error(() => Error('Must contain at least one lower case letter')),
    Joi.string().regex(/[0-9]/).error(() => Error('Must contain one digit')),
    Joi.string().regex(/[!@#$%&^]/).error(() => Error('Must contain one special character !@#$%^&*'))
]

export const validateRetypePassword = (password) => (retyped) => {
    return {"Retyped password must be the same": !(password === retyped)}
}

export const validateSingleField = (validators) => (value) => {
    let errorStates  = validators.reduce((prev, validator) => {
        prev[validator.validate('').error.message] = false
        return prev
    }, {})

    Object.keys(errorStates).forEach((key,idx) => {
        errorStates[key] |= (validators[idx].validate(value).error != undefined)
    })

    return errorStates
}