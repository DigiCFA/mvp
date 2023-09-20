import express from "express";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";

import User from "../models/userModel.js";
import Transaction from "../models/transactionModel.js";
import { handleRouteError, handleTransactionError } from "../utils/errorHandling.js";


const router = express.Router();

router.post("/create_direct_transaction", async (req, res) => {
  const session = await mongoose.startSession();

  const newTransaction = req.body;
  const sendID = newTransaction.sender;
  const receiveID = newTransaction.receiver;

  try {
    await session.withTransaction(async () => {
      const transactionData = new Transaction({
        amountTransferred: newTransaction.amountTransferred,
        sender: newTransaction.sender,
        receiver: newTransaction.receiver,
        paymentMethod: "balance",
        isPayment: newTransaction.isPayment,
        isApproved: newTransaction.isApproved,
        message: newTransaction.message,
        transactionDate: Date.now(),
      });

      const sendUser = await User.findById(sendID);
      if (!sendUser) {
        res.status(404).send(`User with ID ${sendID} Not found`);
        return;
      }
      const receiveUser = await User.findById(receiveID);
      if (!receiveUser) {
        res.status(404).send(`User with ID ${receiveID} Not found`);
        return;
      }

      if (sendID === receiveID) {
        res.status(400).send("Cannot send transaction to self");
        return;
      }

      let userBalance = sendUser.balance;
      let amountTransferred = newTransaction.amountTransferred;
      if (userBalance < amountTransferred) {
        res
          .status(400)
          .send(
            `Balance ${userBalance} insufficient to send ${amountTransferred}`
          );
        return;
      }

      // console.log("TRANSACTION STUFF");
      await sendUser.$inc("balance", -1.0 * amountTransferred);
      await receiveUser.$inc("balance", amountTransferred);
      // console.log("Amount should be: ", newTransaction.amountTransferred);
      // console.log("Actual amount: ", transactionData.amountTransferred);
      console.log(transactionData);

      await transactionData.save();
      // console.log("Inserted transaction");

      // console.log("Supposed to add: ", receiveID);
      let addedUser = sendUser.contacts.addToSet(receiveID);
      receiveUser.contacts.addToSet(sendID);
      // console.log("Added contact: ", addedUser);

      await sendUser.save();
      await receiveUser.save();
      await session.commitTransaction();

      res.status(200).send(transactionData);
    });
  } catch (error) {
    handleTransactionError(res, error);
    await session.abortTransaction();
  } finally {
    await session.endSession();
  }
});



// ------------------------
// OBSOLETE ONES
// ------------------------

// OBSOLETE
router.post("/create_transaction_request", async (req, res) => {
  const session = client.startSession();
  let transaction_data = req.body;
  let transactionID;
  try {
    await session.withTransaction(async () => {
      let transaction_collection = db.collection("transactions");
      let users_collection = db.collection("users");

      await transaction_collection
        .insertOne({
          amount_transfered: transaction_data.amount_transfered,
          transaction_sender: transaction_data.transaction_sender,
          transaction_receiver: transaction_data.transaction_receiver,
          transaction_date: Date.now(),
          transaction_approved: 0,
          transaction_code: 1,
          transaction_message: transaction_data.transaction_message,
        })
        .then(async function (add_result, add_error) {
          if (!add_error) {
            transactionID = add_result.insertedId;
            await users_collection
              .updateOne(
                { _id: new ObjectId(transaction_data.transaction_sender) },
                {
                  $addToSet: { sent_requests: transactionID },
                }
              )
              .then(function (update_result, update_error) {
                if (update_error) {
                  console.error(update_error);
                  res.send(update_error).status(400);
                }
              });
            await users_collection
              .updateOne(
                { _id: new ObjectId(transaction_data.transaction_receiver) },
                {
                  $addToSet: { received_requests: transactionID },
                }
              )
              .then(function (updatetwo_result, updatetwo_error) {
                if (!updatetwo_error) {
                } else {
                  console.error(updatetwo_error);
                  res.send(updatetwo_error).status(400);
                }
              })
              .then(() => {
                res.send({ _id: transactionID }).status(200);
              });
          } else {
            console.error(add_error);
            res.send(add_error).status(400);
          }
        });
    });
  } catch (transact_error) {
    console.error(transact_error);
    res.send(transact_error).status(400);
  } finally {
    await session.endSession();
  }
});

// OBSOLETE
router.patch("/approve_transaction", async (req, res) => {
  const session = client.startSession();
  let transactionData = req.body;
  let transactionID = new ObjectId(transactionData._id);
  try {
    await session.withTransaction(async () => {
      let transaction_collection = db.collection("transactions");
      let users_collection = db.collection("users");
      await transaction_collection
        .findOne({ _id: transactionID })
        .then(async function (find_result, find_error) {
          if (!find_error) {
            let amount_transfered = find_result.amount_transfered;
            let transaction_sender = new ObjectId(
              find_result.transaction_sender
            );
            let transaction_receiver = new ObjectId(
              find_result.transaction_receiver
            );
            await users_collection
              .findOne({ _id: transaction_sender })
              .then(async function (user_result, user_error) {
                if (!user_error) {
                  let current_user_balance = user_result.user_balance;
                  if (current_user_balance < amount_transfered) {
                    res.send({ "balance too low": 0 }).status(400);
                    return;
                  }

                  await transaction_collection
                    .updateOne(
                      { _id: transactionID },
                      {
                        $set: { transaction_approved: 1 },
                      }
                    )
                    .then(async function (update_result, update_error) {
                      if (update_error) {
                        console.error(update_error);
                        res.send(update_error).status(400);
                        return;
                      }
                    });
                  await users_collection
                    .updateOne(
                      { _id: transaction_sender },
                      {
                        $pull: { sent_requests: transactionID },
                        $addToSet: { sent_transactions: transactionID },
                        $inc: { user_balance: amount_transfered * -1.0 },
                      }
                    )
                    .then(async function (update_result, update_error) {
                      if (update_error) {
                        console.error(update_error);
                        res.send(update_error).status(400);
                        return;
                      }
                    });

                  await users_collection
                    .updateOne(
                      { _id: transaction_receiver },
                      {
                        $pull: { received_requests: transactionID },
                        $addToSet: { received_transactions: transactionID },
                        $inc: { user_balance: amount_transfered },
                      }
                    )
                    .then(async function (update_result, update_error) {
                      if (!update_error) {
                      } else {
                        console.error(update_error);
                        res.send(update_error).status(400);
                        return;
                      }
                    });
                } else {
                  console.error(user_error);
                  res.send(user_error).status(400);
                  return;
                }
              });
          } else {
            console.error(find_error);
            res.send(find_error).status(400);
          }
        })
        .then(() => console.log("the request was approved"));
    });
  } catch (error) {
    console.error(error);
    res.send({}).status(400);
  } finally {
    await session.endSession();
    res.send(transactionID).status(200);
  }
});

router.delete(
  "/transaction/mongoose_delete_all_transactions",
  async (req, res) => {
    try {
      let result = await Transaction.deleteMany({});
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

export default router;
