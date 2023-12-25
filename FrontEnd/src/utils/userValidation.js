import Joi from "joi";
import i18n from "../localization/i18nConfig";

export const firstName = Joi.string()
  .regex(/^[A-Za-z]+$/)
  .required()
  .error(() => Error(i18n.t("nameError1")));

export const lastName = Joi.string()
  .regex(/^[A-Za-z]+$/)
  .required()
  .error(() => Error(i18n.t("nameError2")));

export const loginPassword = Joi.string()
  .regex(/^.+$/)
  .required()
  .error(() => Error(i18n.t("passwordError1")));

export const phoneNumberValidation = Joi.string()
  .regex(/^[0-9 ]{8,16}$/)
  .required()
  .error(() => Error(i18n.t("phoneError1")));

export const signupPassword = [
  Joi.string()
    .regex(/^.{6,20}$/)
    .error(() => Error(i18n.t("passwordError2"))),
  Joi.string()
    .regex(/[A-Z]/)
    .error(() => Error(i18n.t("passwordError3"))),
  Joi.string()
    .regex(/[a-z]/)
    .error(() => Error(i18n.t("passwordError4"))),
  Joi.string()
    .regex(/[0-9]/)
    .error(() => Error(i18n.t("passwordError5"))),
];

export const validateRetypePassword = (password) => (retyped) => {
  return { [i18n.t("passwordError6")]: !(password === retyped) };
};

export const validateSingleField = (validators) => (value) => {
  let errorStates = validators.reduce((prev, validator) => {
    prev[validator.validate("").error.message] = false;
    return prev;
  }, {});

  Object.keys(errorStates).forEach((key, idx) => {
    errorStates[key] |= validators[idx].validate(value).error != undefined;
  });

  return errorStates;
};
