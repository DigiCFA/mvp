import i18n from "../localization/i18nConfig";

const createValidator = (regex, errorMessage) => {
  return {
    regex: regex,
    errorMessage: errorMessage,
    validate(value) {
      return regex.test(value) ? {} : {error: Error(errorMessage)}
    }
  }
}

export const firstName = createValidator(/^[A-Za-z]+$/, i18n.t("nameError1"))

export const lastName = createValidator(/^[A-Za-z]+$/,i18n.t("nameError2"))

export const loginPassword = createValidator(/^.+$/, i18n.t("passwordError1"))

export const phoneNumberValidation = createValidator(/^[0-9 ]{8,16}$/,i18n.t("phoneError1"))

export const signupPassword = [
  createValidator(/^.{6,20}$/, i18n.t("passwordError2")),
  createValidator(/[A-Z]/, i18n.t("passwordError3")),
  createValidator(/[a-z]/,i18n.t("passwordError4")),
  createValidator(/[0-9]/, i18n.t("passwordError5"))
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
