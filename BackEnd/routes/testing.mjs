import express from "express";

import User from "../models/userModel.mjs";
import Transaction from "../models/transactionModel.mjs";

const router = express.Router();

// MONGOOSE
router.patch("/mongoose_add_contact", async (req, res) => {
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
    let result2 = await otherUser.save();

    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});

export default router;
