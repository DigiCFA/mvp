import express from "express";

import User from "../models/userModel.js";
import Transaction from "../models/transactionModel.js";

import { format_error, ERROR_CODES } from "../utils/errorHandling.js";

const router = express.Router();

router.patch("/add_contact", async (req, res, next) => {
  let id = req.body.userId;
  let contactId = req.body.contactId;

  try {
    let user = await User.findById(id);
    if (!user) {
      throw format_error(ERROR_CODES.ID_NOT_FOUND)
    }

    if (id === contactId) {
      throw format_error(ERROR_CODES.CANNOT_ADD_SELF_TO_CONTACT)
    }

    let otherUser = await User.findById(contactId);
    if (!otherUser) {
      throw format_error(ERROR_CODES.ID_NOT_FOUND)
    }

    user.contacts.addToSet(contactId);
    let result = await user.save();
    otherUser.contacts.addToSet(id);
    await otherUser.save();

    res.status(200).send(result);
  } catch (error) {
    return next(error);
  }
});

router.patch("/delete_contact", async (req, res, next) => {
  let id = req.body.userId;
  let contactId = req.body.contactId;

  try {
    let user = await User.findById(id);
    if (!user) {
      throw format_error(ERROR_CODES.ID_NOT_FOUND)
    }

    let otherUser = await User.findById(contactId);
    if (!otherUser) {
      throw format_error(ERROR_CODES.ID_NOT_FOUND)
    }

    user.contacts.pull(contactId);
    let result = await user.save();
    otherUser.contacts.pull(id);
    await otherUser.save();

    res.status(200).send(result);
  } catch (error) {
    return next(error);
  }
});

router.delete("/delete_transaction", async (req, res, next) => {
  let id = req.body.transactionId;
  try {
    let result = await Transaction.findByIdAndDelete(id);

    if (!result){
      throw format_error(ERROR_CODES.TRANSACTION_NOT_FOUND)
    }
    else res.status(200).send(result);
  } catch (error) {
    return next(error)
  }
});

export default router;
