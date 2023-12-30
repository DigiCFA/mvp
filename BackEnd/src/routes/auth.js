import express from "express";

import { sessionizeUser } from "../utils/helper.js";
import { format_error, ERROR_CODES } from "../utils/errorHandling.js";
import {init,smsSend,} from "sendpulse-api";
import axios from "axios";

import User from "../models/userModel.js";
import { dinero, toSnapshot } from 'dinero.js';
import { USD,XAF } from '@dinero.js/currencies';
const router = express.Router();

router.post("/signup", async (req, res, next) => {
  const { firstName, lastName, phoneNumber, password } = req.body;

  try {

    const newUser = new User({
      firstName: firstName,
      lastName: lastName,
      fullName: firstName + " " + lastName,
      phoneNumber: phoneNumber,
      phoneNumbers: [phoneNumber],
      balance: toSnapshot(dinero({ amount: 0, currency: XAF })),
      password: password,
      creationDate: Date.now(),
      addresses: [{}]
    }); 
    const sessionUser = sessionizeUser(newUser);
    await newUser.save();

    req.session.user = sessionUser;

    res.status(200).json(sessionUser);
  } catch (err) {
    if(err.message && err.message.includes("phoneNumber") && err.message.includes("unique")){
      err = format_error(ERROR_CODES.DUPLICATE_KEY, "Phone number")
    }
    console.log(err);
    next(err)
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { phoneNumber, password } = req.body;

    const user = await User.findOne({ phoneNumber });
    if(!user){
      throw format_error(ERROR_CODES.PHONE_NUMBER_NOT_FOUND)
    }

    if(!user.comparePasswords(password)){
      throw format_error(ERROR_CODES.PASSWORD_INCORRECT)
    }

    const sessionUser = sessionizeUser(user);
    req.session.user = sessionUser;
    res.status(200).json(sessionUser);

  } catch (error) {
    next(error)
  }
});

router.delete("/logout", ({ session }, res) => {
  try {
    const user = {...session.user};

    if (user) {
      session.destroy((err) => {
        if (err) {
          throw err;
        }
        res.clearCookie(process.env.SESSION_NAME);
        res.status(200).json(user);
      });
    } else {
      throw format_error(ERROR_CODES.UNKNOWN_ERROR)
    }
  } catch (error) {
    next(error)
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

// ------------------------
// PHONE NUMBERS
// ------------------------

router.patch("/add_phone_number", async (req, res, next) => {
  const { userId, phoneNumber } = req.body;
  let phoneNumberNoWhitespace = phoneNumber.replace(/\s/g, "");
  try {
    let user = await User.findById(userId);
    if (!user) {
      throw format_error(ERROR_CODES.ID_NOT_FOUND)
    }
    // Need to add validation
    // await phoneNumberValidation.validateAsync({ phoneNumberNoWhitespace });

    if (user.phoneNumbers.includes(phoneNumberNoWhitespace)) {
      throw format_error(ERROR_CODES.DUPLICATE_KEY, "Phone number")
    } else {
      user.phoneNumbers.addToSet(phoneNumberNoWhitespace);
      await user.save();
      res.status(200).json(user);
    }
  } catch (error) {
    return next(error)
  }
});

router.post("/validate_phone_number", async (req, res, next) => {
  const { userId, phoneNumber } = req.body;
  //let phoneNumberNoWhitespace = phoneNumber.replace(/\s/g, "");
  try {
    // let user = await User.findById(userId);
    // if (!user) {
    //   throw format_error(ERROR_CODES.ID_NOT_FOUND)
    // }
    // Need to add validation
    // await phoneNumberValidation.validateAsync({ phoneNumberNoWhitespace });
    var API_USER_ID = "9155b731212fc83b13a03343e23fa856";
    var API_SECRET = "1dde935ea11bc8b5f4cac254359e9a3b";
    var TOKEN_STORAGE = undefined;
    console.log('your token: ' + phoneNumber);
    let oauthresponse = await axios.post("https://api.sendpulse.com/oauth/access_token",{
      "grant_type":"client_credentials",
      "client_id":API_USER_ID,
      "client_secret":API_SECRET
   })
   let access_token = response.access_token
   let smsresponse= await axios.post("https://api.sendpulse.com/sms/send",{
    
    "sender":"Sender",
    "phones":[
      phoneNumber
    ],
    "body":"body",
    "stat_link_tracking":true,
    "stat_link_need_protocol":true
    },
    {
      headers: {
      'Authorization': 'Bearer ' + access_token
    }},)

    res.status(200).json(smsresponse);

  } catch (error) {
    console.log(error);
    console.log(error);
    console.log(error);
    console.log(error);
    res.status(400).json(error);

    return next(error)
  }
});

router.patch("/delete_phone_number", async (req, res, next) => {
  const { userId, phoneNumber } = req.body;
  let phoneNumberNoWhitespace = phoneNumber.replace(/\s/g, "");
  try {
    let user = await User.findById(userId);
    if (!user) {
      throw format_error(ERROR_CODES.ID_NOT_FOUND)
    }

    // Need to add validation
    // await phoneNumberValidation.validateAsync({ phoneNumberNoWhitespace });
    console.log(user.phoneNumbers);
    console.log(phoneNumberNoWhitespace);

    if (!user.phoneNumbers.includes(phoneNumberNoWhitespace)) {
      throw format_error(ERROR_CODES.PHONE_NOT_FOUND, "Phone number")
    } else if (user.phoneNumber === phoneNumberNoWhitespace) {
      throw format_error(ERROR_CODES.CANNOT_REMOVE_PRIMARY_PHONE)
    } else {
      user.phoneNumbers.pull(phoneNumberNoWhitespace);
      await user.save();
      res.status(200).json(user);
    }
  } catch (error) {
    return next(error)
  }
});

router.patch("/make_primary_phone_number", async (req, res) => {
  const { userId, phoneNumber } = req.body;
  let phoneNumberNoWhitespace = phoneNumber.replace(/\s/g, "");
  try {
    let user = await User.findById(userId);
    if (!user) {
      throw format_error(ERROR_CODES.ID_NOT_FOUND)
    }

    if (!user.phoneNumbers.includes(phoneNumberNoWhitespace)) {
      throw format_error(ERROR_CODES.PHONE_NUMBER_NOT_FOUND)
    } else {
      user.phoneNumber = phoneNumberNoWhitespace;
      // Moving the primary phone number to the first position
      let phoneNumbers = user.phoneNumbers.filter(pn => pn != phoneNumberNoWhitespace);
      phoneNumbers.unshift(phoneNumberNoWhitespace);
      user.phoneNumbers = phoneNumbers
      // user.phoneNumbers.splice(user.phoneNumbers.findIndex(pn => pn == phoneNumberNoWhitespace));
      // user.phoneNumbers =
      // user.phoneNumbers.unshift(phoneNumberNoWhitespace);
      await user.save();
      res.status(200).json(user);
    }
  } catch (error) {
    next(error)
  }
});

export default router;
