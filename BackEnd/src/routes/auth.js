import express from "express";

// import { SESSION_NAME } from "../../config.mjs";
import {
  loginValidation,
  signUpValidation,
  phoneNumberValidation,
} from "../validation/userValidation.js";
import { parseError, sessionizeUser } from "../utils/helper.js";
import { handleRouteError } from "../utils/errorHandling.js";

import User from "../models/userModel.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { firstName, lastName, phoneNumber, password } = req.body;

  try {
    await signUpValidation.validateAsync({
      phoneNumber,
      password,
      firstName,
      lastName,
    });

    const newUser = new User({
      firstName: firstName,
      lastName: lastName,
      fullName: firstName + " " + lastName,
      phoneNumber: phoneNumber,
      phoneNumbers: [phoneNumber],
      password: password,
      creationDate: Date.now(),
      // create a QR Code on creation
    });
    const sessionUser = sessionizeUser(newUser);
    await newUser.save();

    req.session.user = sessionUser;

    res.status(200).json(sessionUser);
  } catch (error) {
    return handleRouteError(res, error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;

    await loginValidation.validateAsync({ phoneNumber, password });

    const user = await User.findOne({ phoneNumber });
    if (user && user.comparePasswords(password)) {
      const sessionUser = sessionizeUser(user);
      req.session.user = sessionUser;

      res.status(200).json(sessionUser);
    } else {
      throw new Error("Invalid Login Credentials");
    }
  } catch (error) {
    return handleRouteError(res, error);
  }
});

router.delete("/logout", ({ session }, res) => {
  try {
    const user = session.user;
    if (user) {
      session.destroy((err) => {
        if (err) {
          throw err;
        }
        res.clearCookie(process.env.SESSION_NAME);
        res.status(200).json(user);
      });
    } else {
      throw new Error("Something went wrong");
    }
  } catch (error) {
    return handleRouteError(res, error);
  }
});

router.get("/obtain_session", ({ session }, res) => {
  try {
    const userId = session.user.userId;
    res.status(200).json({ userId: userId });
  } catch (error) {
    res.status(200).json({ userId: null });
  }
});

// router.post("/auth/create_user", async (req, res) => {
//   let collection = db.collection("users");
//   let user_data = req.body;
//   await collection
//     .insertOne({
//       user_name: user_data.user_name,
//       user_phone_number: user_data.user_phone_number,
//       user_password: user_data.user_password,
//       user_QRCode: user_data.user_QRCode,
//       user_balance: 0,
//       user_card_info: [],
//       privacy_preference: user_data.user_balance,
//       user_contacts: [],
//       transactions: [],
//       received_transactions: [],
//       sent_transactions: [],
//       received_requests: [],
//       sent_requests: [],
//       user_creation_date: Date.now(),
//     })
//     .then(function (add_result, add_error) {
//       if (!add_error) {
//         res.send(add_result).status(200);
//       } else {
//         console.error(add_error);
//         res.send(add_error).status(400);
//       }
//     });
// });

// router.delete("/delete_user", async (req, res) => {
//   let id = req.body.userId;
//   try {
//     let result = await User.findByIdAndDelete(id);

//     if (!result) res.status(404).send(`User with ID ${id} Not found`);
//     else res.status(200).send(result);
//   } catch (error) {
//     console.error(error);
//     res.status(400).send(error);
//   }
// });

// router.post("/user_login", async (req, res) => {
//   let collection = db.collection("users");
//   let user_input = req.body;
//   let findUser = await collection.findOne(
//     { user_phone_number: user_input.user_phone_number },
//     function (error, result) {
//       if (!error) {
//         res.send({}).status(200);
//       } else {
//         console.error(error);
//         res.send({}).status(400);
//       }
//     }
//   );
// });

// ------------------------
// PHONE NUMBERS
// ------------------------

router.patch("/add_phone_number", async (req, res) => {
  const { userId, phoneNumber } = req.body;
  let phoneNumberNoWhitespace = phoneNumber.replace(/\s/g, "");
  try {
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        error_code: "USER_NOT_FOUND",
        message: `User with ID ${userId} not found`,
      });
    }
    // Need to add validation
    // await phoneNumberValidation.validateAsync({ phoneNumberNoWhitespace });

    if (user.phoneNumbers.includes(phoneNumberNoWhitespace)) {
      return res.status(422).json({
        error_code: "PHONE_ALREADY_ADDED",
        message: "This phone number has already been added.",
      });
    } else {
      user.phoneNumbers.addToSet(phoneNumberNoWhitespace);
      await user.save();
      res.status(200).json(user);
    }
  } catch (error) {
    return handleRouteError(res, error);
  }
});

router.patch("/delete_phone_number", async (req, res) => {
  const { userId, phoneNumber } = req.body;
  let phoneNumberNoWhitespace = phoneNumber.replace(/\s/g, "");
  try {
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        error_code: "USER_NOT_FOUND",
        message: `User with ID ${userId} not found`,
      });
    }

    // Need to add validation
    // await phoneNumberValidation.validateAsync({ phoneNumberNoWhitespace });
    console.log(user.phoneNumbers);
    console.log(phoneNumberNoWhitespace);

    if (!user.phoneNumbers.includes(phoneNumberNoWhitespace)) {
      return res.status(422).json({
        error_code: "PHONE_NOT_FOUND",
        message: "This phone number has not been added.",
      });
    } else if (user.phoneNumber === phoneNumberNoWhitespace) {
      return res.status(422).json({
        error_code: "CANNOT_REMOVE_PRIMARY_PHONE",
        message: "Cannot remove the primary phone number. Please make another phone number the primary phone number first.",
      });
    } else {
      user.phoneNumbers.pull(phoneNumberNoWhitespace);
      await user.save();
      res.status(200).json(user);
    }
  } catch (error) {
    return handleRouteError(res, error);
  }
});

router.patch("/make_primary_phone_number", async (req, res) => {
  const { userId, phoneNumber } = req.body;
  let phoneNumberNoWhitespace = phoneNumber.replace(/\s/g, "");
  try {
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        error_code: "USER_NOT_FOUND",
        message: `User with ID ${userId} not found`,
      });
    }

    if (!user.phoneNumbers.includes(phoneNumberNoWhitespace)) {
      return res.status(422).json({
        error_code: "PHONE_NOT_FOUND",
        message: "This phone number has not been added.",
      });
    } else {
      user.phoneNumber = phoneNumberNoWhitespace;
      await user.save();
      res.status(200).json(user);
    }
  } catch (error) {
    return handleRouteError(res, error);
  }
});

export default router;
