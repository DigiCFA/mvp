import express from "express";

// import { SESSION_NAME } from "../../config.mjs";
import {
  loginValidation,
  signUpValidation,
} from "../validation/userValidation.js";
import { parseError, sessionizeUser } from "../utils/helper.js";

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
      password: password,
      creationDate: Date.now(),
      // create a QR Code on creation
    });
    console.log(req.session);
    const sessionUser = sessionizeUser(newUser);
    await newUser.save();

    console.log(sessionUser);
    console.log(req.session);
    req.session.user = sessionUser;
    console.log(req.session);

    res.status(200).send(newUser);
  } catch (error) {
    console.log(parseError(error));
    res.status(400).send(parseError(error));
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
      res.send(sessionUser);
    } else {
      throw new Error("Invalid Login Credentials");
    }
  } catch (error) {
    console.log(error);
    res.status(401).send(parseError(error));
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
        res.send(user);
      });
    } else {
      throw new Error("Something went wrong");
    }
  } catch (error) {
    res.status(422).send(parseError(err));
  }
});

router.get("/obtainSession", ({ session: { user } }, res) => {
  res.send({ user });
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

router.delete("/delete_user", async (req, res) => {
  let id = req.body.userId;
  try {
    let result = await User.findByIdAndDelete(id);

    if (!result) res.status(404).send(`User with ID ${id} Not found`);
    else res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});

router.post("/user_login", async (req, res) => {
  let collection = db.collection("users");
  let user_input = req.body;
  let findUser = await collection.findOne(
    { user_phone_number: user_input.user_phone_number },
    function (error, result) {
      if (!error) {
        res.send({}).status(200);
      } else {
        console.error(error);
        res.send({}).status(400);
      }
    }
  );
});

// ------------------------
// OBSOLETE ONES
// ------------------------

export default router;
