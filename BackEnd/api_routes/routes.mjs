import express from "express";
import { db_ref, client_ref } from "../database/connect.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

let db = db_ref();
let client = client_ref();

router.get("/", (req, res, next) => {
    console.log("On /, displaying all transactions");
    next();
  },
  async (req, res) => {
    let collection = db.collection("transactions");
    let results = await collection.find({}).toArray();
    let text =
      `<div>
        <h1>Welcome to DigiCFA</h1>
        <h3>All transactions: </h3>
       </div>` + JSON.stringify(results);

    res.send(text).status(200);
  }
);

router.post("/auth/create_user", async (req, res) => {
  let collection = db.collection("users");
  let user_data = req.body;
  await collection
    .insertOne({
      user_name: user_data.user_name,
      user_phone_number: user_data.user_phone_number,
      user_password: user_data.user_password,
      user_QRCode: user_data.user_QRCode,
      user_balance: 0,
      user_card_info: [],
      privacy_preference: user_data.user_balance,
      user_contacts: [],
      transactions: [],
      requests: [],
      user_creation_date: Date.now(),
    })
    .then(function (add_result, add_error) {
      if (!add_error) {
        res.send(add_result).status(200);
      } else {
        console.error(add_error);
        res.send(add_error).status(400);
      }
    });
  res.send(results).status(200);
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

router.post("/transaction/create_transaction_request", async (req, res) => {
  const session = client.startSession();
  let transaction_data = req.body;
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
            let transactionID = add_result.insertedId;
            await users_collection
              .updateOne(
                { _id: new ObjectId(transaction_data.transaction_sender) },
                {
                  $push: { sent_requests: transactionID },
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
                  $push: { received_requests: transactionID },
                }
              )
              .then(function (updatetwo_result, updatetwo_error) {
                if (!updatetwo_error) {
                  res.send(updatetwo_result).status(200);
                } else {
                  console.error(updatetwo_error);
                  res.send(updatetwo_error).status(400);
                }
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

router.patch("/transaction/approve_transaction", async (req, res) => {
  const session = client.startSession();
  let transaction_data = req.body;
  let transactionID = transaction_data._id;
  try {
    await session.withTransaction(async () => {
      let transaction_collection = db.collection("transactions");
      let users_collection = db.collection("users");
      await collection.findOne(
        { _id: transactionID },
        async function (error, result) {
          if (!error) {
            let amount_transfered = result.amount_transfered;
            let transaction_sender = result.transaction_sender;
            let transaction_receiver = result.transaction_receiver;
            await users_collection.findOne(
              { _id: transaction_sender },
              async function (error, result) {
                if (!error) {
                  let current_user_balance = result.user_balance;
                  if (current_user_balance < amount_transfered) {
                    res.send({}).status(400);
                    return;
                  }

                  await transaction_collection.updateOne(
                    { _id: transactionID },
                    {
                      $set: { transaction_approved: 1 },
                    },
                    async function (error, result) {
                      if (error) {
                        console.error(error);
                        res.send({}).status(400);
                      }
                    }
                  );
                  await users_collection.updateOne(
                    { _id: transaction_sender },
                    {
                      $pull: { sent_requests: transactionID },
                      $push: { sent_transactions: transactionID },
                      $inc: { user_balance: amount_transfered * -1.0 },
                    },
                    async function (error, result) {
                      if (error) {
                        console.error(error);
                        res.send({}).status(400);
                      }
                    }
                  );

                  await users_collection.updateOne(
                    { _id: transaction_receiver },
                    {
                      $pull: { received_requests: transactionID },
                      $push: { received_transactions: transactionID },
                      $inc: { user_balance: amount_transfered },
                    },
                    async function (error, result) {
                      if (!error) {
                        res.send({}).status(200);
                      } else {
                        console.error(error);
                        res.send({}).status(400);
                      }
                    }
                  );
                } else {
                  console.error(error);
                  res.send({}).status(400);
                }
              }
            );
          } else {
            console.error(error);
            res.send({}).status(400);
          }
        }
      );
    });
  } catch (error) {
    console.error(error);
    res.send({}).status(400);
  } finally {
    await session.endSession();
  }
});

export default router;
