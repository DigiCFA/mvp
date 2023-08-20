import express from "express";

import profile from "./profile.mjs";
import auth from "./auth.mjs";
import transaction from "./transaction.mjs";
import testing from "./testing.mjs";

import User from "../models/userModel.mjs";
import Transaction from "../models/transactionModel.mjs";

const router = express.Router();

router.use("/profile", profile);
router.use("/auth", auth);
router.use("/transaction", transaction);
router.use("/testing", testing);

// Trying out middleware
router.get(
  "/",
  (req, res, next) => {
    console.log("On /api, displaying all transactions and users");
    next();
  },
  async (req, res) => {
    let transactions = await Transaction.find({});
    let users = await User.find({});
    let indexes = await User.collection.getIndexes({ full: true });
    let numOfUsers = await User.estimatedDocumentCount();
    let numOfTransactions = await Transaction.estimatedDocumentCount();
    let userNames = await User.find({}, 'fullName')
    let text =
      `<h1>Welcome to DigiCFA</h1>` +
      `<h4>Total number of users: </h4>`+ 
      numOfUsers + `<br>` +
      JSON.stringify(userNames) +
      `<h4>Total number of transactions: </h4>`+ 
      numOfTransactions + 
      `<h3>All Users: </h3>` +
      JSON.stringify(users) +
      `<h3>All Transactions: </h3>` +
      JSON.stringify(transactions) +
      `<h3>All Indexes: </h3>` +
      JSON.stringify(indexes);

    res.status(200).send(text);
  }
);

export default router;
