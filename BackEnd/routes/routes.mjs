import express from "express";
import { dbRef } from "../database/connect.mjs";
import { ObjectId } from "mongodb";
import mongoose from 'mongoose';

import awsController from "../controllers/awsController.mjs";

// IGNORE THESE - delete soon
let clientRef = () => {};
let client = clientRef();

import User from "../models/userModel.mjs";
import Transaction from "../models/transactionModel.mjs";

const router = express.Router();
let db = dbRef();


// Trying out middleware
router.get(
  "/",
  (req, res, next) => {
    console.log("On /, displaying all transactions and users");
    next();
  },
  async (req, res) => {
    let transactions = await db.collection("transactions").find({}).toArray();
    let users = await db.collection("users").find({}).toArray();
    let indexes = await User.collection.getIndexes({full: true});
    let text =
      `<div>
        <h1>Welcome to DigiCFA</h1>
        <h3>All Transactions: </h3>
       </div>` +
      JSON.stringify(transactions) +
      `<h3>All Users: </h3>` +
      JSON.stringify(users) + 
      `<h3>All Indexes: </h3>` +
      JSON.stringify(indexes);

    res.status(200).send(text);
  }
);

router.get("/profile/retrieve_user", async (req, res) => {
  let id = req.query.userId;
  try {
    // Top 5 contacts
    let result = await User.findById(id).populate({
      path: "contacts",
      perDocumentLimit: 5,
      select: ["fullName", "phoneNumber"]
    })

    if (!result) res.status(404).send(`User with ID ${id} not found`);
    else res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});

router.get("/profile/retrieve_user_transactions", async (req, res) => {
  let id = req.query.userId;
  try {
    // all transactions
    let result = await Transaction.find(
      { $or: [{sender: id}, {receiver: id}],
        isFulfilled: true,
      })
      .populate({path: "sender", select: ["fullName", "_id"]})
      .populate({path: "receiver", select: ["fullName", "_id"]});

    if (result.length===0) res.status(404).send(`User with ID ${id} has no transactions`);
    else res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});


router.get(
  "/profile/retrieve_user_with_certain_fields",
  async (req, res) => {
    let id = req.query.userId;
    try {
      let user = await User.findById(id).populate({
        // 5 most recent contacts
        path: "contacts",
        perDocumentLimit: 5,
        select: ["fullName", "phoneNumber"]
      })

      if (!user) {
        res.status(404).send(`User with ID ${id} Not found`);
        return;
      }
      // Find all transactions within 2 months
      let transactions = await Transaction.find(
        { $or: [{sender: id}, {receiver: id}],
          isFulfilled: true,
        });


      // // Aggregating the two together is more complicated
      // let result = db.users.aggregate([
      //   {
      //     "$lookup": {
      //       "from": "transactions",
      //       "localField": "_id",
      //       "foreignField": {$or: ["sender", "receiver"]},
      //       "as": "transactions"
      //     }
      //   }, {
      //     "$lookup": {
      //       "from": "users",
      //       "localField": "_id",
      //     }
      //   }
      // ])

      res.status(200).send(user);
      // res.status(200).send(transactions);
    } catch (error) {
      console.error(error);
      res.status(400).send(error);
    }
  }
);



router.patch("/profile/add_card", async (req, res) => {
  let id = req.body.userId;
  try {
    let user = await User.findById(id);
    if (!user) {
      res.status(404).send(`User with ID ${id} Not found`);
      return;
    }
    const newCard = await user.cards.create({
      name: req.body.name,
      accountHolder: req.body.accountHolder,
      cardNumber: req.body.cardNumber,
      cardType: req.body.cardType.toLowerCase(),
      expDate: req.body.expDate,
      cvv: req.body.cvv,
      billingAddress: req.body.billingAddress
    });

    // Check if card number already exists
    const card = await User.findOne({
      "_id": id
    }, {
      "cards": {
        "$elemMatch": {
          "$or":[
          {"cardNumber": req.body.cardNumber},
          {"name": req.body.name}
          ]
        }
      }
    })

    if (card.cards.length != 0) {
      console.log(card);
      res.send("This card number or name has already been added.").status(422);
    } else {
      await user.cards.addToSet(newCard);
      await user.save();
      res.status(200).send(newCard);
    }

  } catch (error) {
    res.status(400).send(error);
  }
});


router.patch("/profile/remove_card", async(req, res) => {
  let id = req.body.userId;
  let cardId = req.body.cardId;
  // let cardNumber = req.body.cardNumber;
  //card.expDate = Date(card.expDate);
  // console.log(cardNumber);
  try {
    let user = await User.findById(id);
    if (!user) {
      res.status(404).send(`User with ID ${id} Not found`);
      return;
    }

    await user.cards.pull(cardId);
    await user.save()

    res.status(200).send(user);
  } catch(error) {
    console.error(error);
    res.status(400).send(error);
  }
})

router.post("/auth/create_user", async (req, res) => {
  let user = req.body;
  try {
    const result = await User.create({
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: user.firstName + ' ' + user.lastName,
      phoneNumber: user.phoneNumber,
      password: user.password,
      creationDate: Date.now()
      // create a QR Code on creation
    });
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
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


router.delete("/auth/delete_user", async (req, res) => {
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



router.post("/auth/user_login", async (req, res) => {
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


// DON'T need the contact functionality -> FOR TESTING PURPOSES ONLY


// MONGOOSE
router.patch("/testing/mongoose_add_contact", async (req, res) => {
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


// OBSOLETE
router.patch("/profile/add_contact", async (req, res) => {
  let collection = db.collection("users");
  let user_input = req.body;
  await collection
    .updateOne(
      { _id: new ObjectId(user_input.user_id) },
      { $addToSet: { user_contacts: user_input.contact_id } }
    )
    .then(async function (update_result, update_error) {
      if (!update_error) {
        await collection
          .updateOne(
            { _id: new ObjectId(user_input.contact_id) },
            { $addToSet: { user_contacts: user_input.user_id } }
          )
          .then(function (updatetwo_result, updatetwo_error) {
            if (!updatetwo_error) {
              res.send({ update_result, updatetwo_result }).status(200);
            } else {
              console.error(updatetwo_error);
              res.send(updatetwo_error).status(400);
            }
          });
      } else {
        console.error(update_error);
        res.send({ update_error }).status(400);
      }
    });
});

// OBSOLETE
router.patch("/profile/remove_contact", async (req, res) => {
  let collection = db.collection("users");
  let user_input = req.body;
  await collection
    .updateOne(
      { _id: new ObjectId(user_input.user_id) },
      { $pull: { user_contacts: user_input.contact_id } }
    )
    .then(async function (pull_result, pull_error) {
      if (!pull_error) {
        await collection
          .updateOne(
            { _id: new ObjectId(user_input.contact_id) },
            { $pull: { user_contacts: user_input.user_id } }
          )
          .then(function (pulltwo_result, pulltwo_error) {
            if (!pulltwo_error) {
              res.send({ pull_result, pulltwo_result }).status(200);
            } else {
              console.error(pulltwo_error);
              res.send(pulltwo_error).status(400);
            }
          });
      } else {
        console.error(pull_error);
        res.send(pull_error).status(400);
      }
    });
});


router.patch("/profile/add_balance", async(req, res) => {
  let id = req.body.userID;
  try {
    let user = await User.findById(id);
    if (!user) {
      res.status(404).send(`User with ID ${id} Not found`);
      return;
    }

    user.balance += req.body.amount;
    
    await user.save();
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
})



router.post("/transaction/create_direct_transaction", async (req, res) => {
  
  const session = await mongoose.startSession();

  let newTransaction = req.body;

  let sendID = newTransaction.sender;
  let receiveID = newTransaction.receiver;

  let transactions = db.collection("transactions");
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
        transactionDate: Date.now()
      });

      const sendUser = await User.findById(sendID);
      if (!sendUser) {
        res.status(404).send(`User with ID ${sendID} Not found`);
        return;
      }
      const receiveUser = await User.findById(receiveID);
      if (!receiveUser) {
        res.status(404).send(`User with ID ${receiveID} Not found`);
        console.log("SHOULD TERMINATE");
        return;
      }

      if (sendID === receiveID) {
        res.status(400).send("Cannot send transaction to self");
        console.log("SHOULD TERMINATE");
        return;
      }
      
      let userBalance = sendUser.balance
      let amountTransferred = newTransaction.amountTransferred;
      if (userBalance < amountTransferred) {
        res.status(400).send(`Balance ${userBalance} insufficient to send ${amountTransferred}`);
        console.log("SHOULD TERMINATE");
        return;
      }

      console.log("TRANSACTION STUFF");
      await sendUser.$inc('balance', -1.0*amountTransferred);
      await receiveUser.$inc('balance', amountTransferred);
      console.log("Amount should be: ", newTransaction.amountTransferred);
      console.log("Actual amount: ", transactionData.amountTransferred);
      console.log(transactionData);

      await transactions.insertOne(transactionData);

      await sendUser.save();
      await receiveUser.save();
      await session.commitTransaction();  

      res.status(200).send(transactionData);
    });
  } catch (transactError) {
    // console.error(transactError);
    res.status(400).send(transactError);
    await session.abortTransaction();
  }
  finally{
    await session.endSession();
  }
})








// OBSOLETE

router.post("/transaction/create_transaction_request", async (req, res) => {
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
router.patch("/transaction/approve_transaction", async (req, res) => {
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


// OBSOLEE
router.get("/transaction/transaction_data", async (req, res) => {
  let transaction_id = req.body.transaction_id;
  let transaction_collection = db.collection("transactions");
  await transaction_collection
    .findOne({ _id: new ObjectId(transaction_id) })
    .then(async (result, error) => {
      if (!error) {
        res.send(result).status(200);
      } else {
        console.error(error);
        res.send(error).status(400);
      }
    });
});

// OBSOLETE
router.get("/profile/retrieve_all_transactions", async (req, res) => {
  let user_id = req.body.user_id;
  let users_collection = db.collection("users");
  let transaction_collection = db.collection("transactions");
  await users_collection
    .findOne({ _id: new ObjectId(user_id) })
    .then(async (result, error) => {
      if (!error) {
        let transaction_ids = result.transactions;
        let transaction_data = [];
        await Promise.all(
          transaction_ids.map(async (transaction_id) => {
            await transaction_collection
              .findOne({ _id: new ObjectId(transaction_id) })
              .then(async (result, error) => {
                if (!error) {
                  console.log(result);
                  transaction_data.push(result);
                } else {
                  console.error(error);
                  res.send(error).status(400);
                }
              });
          })
        ).then(() => {
          console.log(transaction_data);
          res.send(transaction_data).status(200);
        });
      } else {
        console.error(error);
        res.send(error).status(400);
      }
    });
});


// OBSOLETE
router.get(
  "/profile/retrieve_transactions/:transaction_status",
  async (req, res) => {
    let queryArray = req.params.transaction_status;
    let user_id = req.body.user_id;
    let users_collection = db.collection("users");
    let transaction_collection = db.collection("transactions");
    await users_collection
      .findOne({ _id: new ObjectId(user_id) })
      .then(async (result, error) => {
        if (!error) {
          let transaction_ids = result[queryArray];
          let transaction_data = [];
          await Promise.all(
            transaction_ids.map(async (transaction_id) => {
              await transaction_collection
                .findOne({ _id: new ObjectId(transaction_id) })
                .then(async (result, error) => {
                  if (!error) {
                    transaction_data.push(result);
                  } else {
                    console.error(error);
                    res.send(error).status(400);
                  }
                });
            })
          ).then(() => {
            console.log(transaction_data);
            res.send(transaction_data).status(200);
          });
        } else {
          console.error(error);
          res.send(error).status(400);
        }
      });
  }
);





// MONGOOSE
router.delete("/transaction/mongoose_delete_transaction", async (req, res) => {
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


router.delete("/transaction/mongoose_delete_all_transactions", async(req, res) => {
  try{
    let result = await Transaction.deleteMany({});
    res.status(200).send(result);
  } catch(error) {
  res.status(400).send(error);
  }
});




export default router;
