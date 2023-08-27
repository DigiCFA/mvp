import express from "express";

import User from "../models/userModel.js";
import Transaction from "../models/transactionModel.js";

const router = express.Router();

router.patch("/add_contact", async (req, res) => {
  let id = req.body.userId;
  let contactId = req.body.contactId;

  try {
    let user = await User.findById(id);
    if (!user) {
      res.status(404).send(`User with ID ${id} Not found`);
      return;
    }

    if (id === contactId) {
      res.status(400).send("Cannot add self as contact");
      return;
    }

    let otherUser = await User.findById(contactId);
    if (!otherUser) {
      res.status(404).send(`User with ID ${contactId} Not found`);
      return;
    }

    user.contacts.addToSet(contactId);
    let result = await user.save();
    otherUser.contacts.addToSet(id);
    await otherUser.save();

    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});

router.patch("/delete_contact", async (req, res) => {
  let id = req.body.userId;
  let contactId = req.body.contactId;

  try {
    let user = await User.findById(id);
    if (!user) {
      res.status(404).send(`User with ID ${id} Not found`);
      return;
    }

    let otherUser = await User.findById(contactId);
    if (!otherUser) {
      res.status(404).send(`User with ID ${contactId} Not found`);
      return;
    }

    user.contacts.pull(contactId);
    let result = await user.save();
    otherUser.contacts.pull(id);
    await otherUser.save();

    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});

// MONGOOSE
router.delete("/delete_transaction", async (req, res) => {
  let id = req.body.transactionId;
  try {
    let result = await Transaction.findByIdAndDelete(id);

    if (!result) res.status(404).send(`Transaction with ID ${id} Not found`);
    else res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});

export default router;
