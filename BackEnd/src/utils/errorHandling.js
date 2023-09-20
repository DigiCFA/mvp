import Joi from "joi";

export const parseError = (err) => {
  if (err.isJoi) return err.details[0];
  return JSON.stringify(err, Object.getOwnPropertyNames(err));
};

export const handleRouteError = (res, error) => {
  if (Joi.isError(error)) {
    return res.status(422).json({
      error_code: "VALIDATION_ERROR",
      message: error.details[0].message,
    });
  } else if (error.name === "CastError") {
    // MongoDB CastError (e.g., invalid ObjectId)
    return res.status(400).json({
      error_code: "INVALID_ID",
      message: "Invalid ID format.",
    });
  } else if (error.name === "MongoError" && error.code === 11000) {
    return res.status(422).json({
      error_code: "DUPLICATE_KEY",
      message: "Duplicate key error.",
    });
  } else {
    console.error("Server error: ", error);
    return res.status(500).json({
      error_code: "SERVER_ERROR",
      message: "Internal server error occurred.",
    });
  }
};

export const handleTransactionError = (res, error) => {
  if (
    error.errorLabels &&
    error.errorLabels.includes("TransientTransactionError")
  ) {
    return res.status(503).json({
      error_code: "TRANSIENT_TRANSACTION_ERROR",
      message:
        "The transaction could not be completed due to a transient error. Please retry.",
    });
  } else {
    console.error("Error in transaction: ", error);
    return res.status(500).json({
      error_code: "SERVER_ERROR",
      message: "Internal server error occurred during the transaction.",
    });
  }
};
