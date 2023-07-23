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
      transactions:[],
      received_transactions:[],
      sent_transactions:[],
      received_requests: [],
      sent_requests:[],
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
              }).then(()=>{
                res.send({"_id":transactionID}).status(200);
              })
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
  let transactionData = req.body;
  let transactionID = new ObjectId(transactionData._id);
  try {
    await session.withTransaction(async () => {
      let transaction_collection = db.collection("transactions");
      let users_collection = db.collection("users");
      await transaction_collection.findOne(
        { _id: transactionID })
        .then(async function (find_result, find_error) {
          if (!find_error) {
            let amount_transfered = find_result.amount_transfered;
            let transaction_sender = new ObjectId(find_result.transaction_sender);
            let transaction_receiver = new ObjectId(find_result.transaction_receiver);
            await users_collection.findOne(
              { _id: transaction_sender })
              .then(async function (user_result, user_error) {
                if (!user_error) {
                  let current_user_balance = user_result.user_balance;
                  if (current_user_balance < amount_transfered) {
                    res.send({"balance too low":0}).status(400);
                    return;
                  }

                  await transaction_collection.updateOne(
                    { _id: transactionID },
                    {
                      $set: { transaction_approved: 1 },
                    })
                    .then(async function (update_result, update_error) {
                      if (update_error) {
                        console.error(update_error);
                        res.send(update_error).status(400);
                        return;
                      }
                    }
                  );
                  await users_collection.updateOne(
                    { _id: transaction_sender },
                    {
                      $pull: { sent_requests: transactionID },
                      $addToSet: { sent_transactions: transactionID },
                      $inc: { user_balance: amount_transfered * -1.0 },
                    })
                    .then(async function (update_result, update_error) {
                      if (update_error) {
                        console.error(update_error);
                        res.send(update_error).status(400);
                        return;
                      }
                    })

                  await users_collection.updateOne(
                    { _id: transaction_receiver },
                    {
                      $pull: { received_requests: transactionID },
                      $addToSet: { received_transactions: transactionID },
                      $inc: { user_balance: amount_transfered },
                    })
                    .then(async function (update_result, update_error) {
                      if (!update_error) {
                        
                      } else {
                        console.error(update_error);
                        res.send(update_error).status(400);
                        return;
                      }
                  })
                } else {
                  console.error(user_error);
                  res.send(user_error).status(400);
                  return;
                }
              })
          } else {
            console.error(find_error);
            res.send(find_error).status(400);
          }
        })
        .then(()=>
        console.log("the request was approved"));
    });
  } catch (error) {
    console.error(error);
    res.send({}).status(400);
  } finally {
    await session.endSession();
    res.send(transactionID).status(200);
  }
});

router.get("/transaction/transaction_data",async(req,res)=>{
  let transaction_id = req.body.transaction_id;
  let transaction_collection = db.collection("transactions");
  await transaction_collection.findOne({_id:new ObjectId(transaction_id)}).then(async (result,error)=>{
    if(!error){
      res.send(result).status(200);
    }
    else{
      console.error(error);
      res.send(error).status(400);

    }
  })



})



router.get("/profile/retrieve_all_transactions",async(req,res)=>{
  let user_id = req.body.user_id;
  let users_collection = db.collection("users");
  let transaction_collection = db.collection("transactions");
  await users_collection.findOne({_id:new ObjectId(user_id)}).then(async (result,error)=>{
    if(!error){
      let transaction_ids = result.transactions;
      let transaction_data = []
      await Promise.all(transaction_ids.map(async (transaction_id)=>{
        await transaction_collection.findOne({_id:new ObjectId(transaction_id)}).then(async (result,error)=>{
          if(!error){
            console.log(result);
            transaction_data.push(result);
          }
          else{
            console.error(error);
            res.send(error).status(400);
      
          }
        })
      })).then(()=>{
        console.log(transaction_data);
        res.send(transaction_data).status(200);

      })
      
    }
    else{
      console.error(error);
      res.send(error).status(400);

    }
  })



})


router.get("/profile/retrieve_transactions/:transaction_status",async(req,res)=>{
  let queryArray = req.params.transaction_status;
  let user_id = req.body.user_id;
  let users_collection = db.collection("users");
  let transaction_collection = db.collection("transactions");
  await users_collection.findOne({_id:new ObjectId(user_id)}).then(async (result,error)=>{
    if(!error){
      let transaction_ids = result[queryArray];
      let transaction_data = []
      await Promise.all(transaction_ids.map(async (transaction_id)=>{
        await transaction_collection.findOne({_id:new ObjectId(transaction_id)}).then(async (result,error)=>{
          if(!error){
            transaction_data.push(result);
          }
          else{
            console.error(error);
            res.send(error).status(400);
      
          }
        })
      })).then(()=>{
        console.log(transaction_data);
        res.send(transaction_data).status(200);

      })
      
    }
    else{
      console.error(error);
      res.send(error).status(400);

    }
  })



})





router.get("/profile/retrieve_user_data",async(req,res)=>{
  let user_id = req.body.user_id;
  let users_collection = db.collection("users");
  await users_collection.findOne({_id:new ObjectId(user_id)}).then(async (result,error)=>{
          if(!error){
            res.send(result).status(200);
          }
          else{
            console.error(error);
            res.send(error).status(400);
      
          }
      
  })



})

export default router;

