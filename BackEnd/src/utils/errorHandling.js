import Joi from "joi";

/*
1000 - 1999: Authentication error
2000 - 2999: Profile error
3000 - 3999: Transaction error
4000 - 4999: Contacts error
*/
export const ERROR_CODES = {
  DUPLICATE_KEY: 1000,
  PHONE_NUMBER_NOT_FOUND: 1001,
  PASSWORD_INCORRECT: 1002,
  CANNOT_REMOVE_PRIMARY_PHONE: 1003,
  INVALID_ID_FORMAT: 2000,
  ID_NOT_FOUND: 2001,
  CANNOT_TRANSACT_TO_SELF: 3000,
  INSUFFICIENT_BALANCE: 3001,
  TRANSACTION_NOT_FOUND: 3002,
  CANNOT_ADD_SELF_TO_CONTACT: 4000,
  UNKNOWN_ERROR: 5000
}

export const KNOWN_ERROR_CODES = Object.keys(ERROR_CODES).map((key) => ERROR_CODES[key])

export const ERROR_MESSAGES = {
  [ERROR_CODES.DUPLICATE_KEY]: (field) => {return `${field} already exists`},
  [ERROR_CODES.PHONE_NUMBER_NOT_FOUND]: "Phone number not found",
  [ERROR_CODES.PASSWORD_INCORRECT]: "Password is incorrect",
  [ERROR_CODES.CANNOT_REMOVE_PRIMARY_PHONE]: "Cannot remove the primary phone number. Please make another phone number the primary phone number first",
  [ERROR_CODES.INVALID_ID_FORMAT]: "Invalid userId format",
  [ERROR_CODES.ID_NOT_FOUND]: "User ID not found",
  [ERROR_CODES.CANNOT_TRANSACT_TO_SELF]: "Cannot send transaction to self",
  [ERROR_CODES.INSUFFICIENT_BALANCE]: (balance, amountTransferred) => 
    {return `Your balance ${balance} is insufficient to send ${amountTransferred}`},
  [ERROR_CODES.TRANSACTION_NOT_FOUND]: "Transaction not found",
  [ERROR_CODES.CANNOT_ADD_SELF_TO_CONTACT]: "Cannot add self as contact",
  [ERROR_CODES.UNKNOWN_ERROR]: "An internal server error occured, please try again later"
}

export const format_error = (error_code, error_payload = null) => {
  return error_payload ? {
    code: error_code,
    payload: error_payload
  } : {
    code: error_code
  }
}

export const mapErrorCodeToHttpCode = (errorCode) => {
  switch(errorCode){
    case ERROR_CODES.DUPLICATE_KEY:
      return 422
    case ERROR_CODES.PHONE_NUMBER_NOT_FOUND:
    case ERROR_CODES.ID_NOT_FOUND:
      return 404

    case ERROR_CODES.INVALID_ID_FORMAT:
    case ERROR_CODES.PASSWORD_INCORRECT: 
    case ERROR_CODES.CANNOT_TRANSACT_TO_SELF:
    case ERROR_CODES.INSUFFICIENT_BALANCE:
    case ERROR_CODES.CANNOT_REMOVE_PRIMARY_PHONE:
      return 400

    case ERROR_CODES.UNKNOWN_ERROR:
    default:
      return 500
  }
}

// export const handleRouteError = (res, error) => {
//   if (Joi.isError(error)) {
//     return res.status(422).json({
//       error_code: "VALIDATION_ERROR",
//       message: error.details[0].message,
//     });
//   } else if (error.name === "CastError") {
//     // MongoDB CastError (e.g., invalid ObjectId)
//     return res.status(400).json({
//       error_code: "INVALID_ID",
//       message: "Invalid ID format.",
//     });
//   } else if (error.name === "MongoError" && error.code === 11000) {
//     return res.status(422).json({
//       error_code: "DUPLICATE_KEY",
//       message: "Duplicate key error.",
//     });
//   } else {
//     console.error("Server error: ", error);
//     return res.status(500).json({
//       error_code: "SERVER_ERROR",
//       message: "Internal server error occurred.",
//     });
//   }
// };

// export const handleTransactionError = (res, error) => {
//   if (
//     error.errorLabels &&
//     error.errorLabels.includes("TransientTransactionError")
//   ) {
//     return res.status(503).json({
//       error_code: "TRANSIENT_TRANSACTION_ERROR",
//       message:
//         "The transaction could not be completed due to a transient error. Please retry.",
//     });
//   } else {
//     console.error("Error in transaction: ", error);
//     return res.status(500).json({
//       error_code: "SERVER_ERROR",
//       message: "Internal server error occurred during the transaction.",
//     });
//   }
// };
