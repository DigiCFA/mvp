import express from "express";

import { upload } from "../middleware/multer.js";
import { retrieveFromS3, uploadToS3 } from "../controllers/awsController.js";
import { format_error, ERROR_CODES } from "../utils/errorHandling.js";

import User from "../models/userModel.js";
import Transaction from "../models/transactionModel.js";

//import {mongoose_fuzzy_searching} from "mongoose-fuzzy-searching"

const router = express.Router();

const profilePicBaseURL =
  "https://digicfa-profilepics.s3.af-south-1.amazonaws.com/";

router.get("/retrieve_user", async (req, res, next) => {
  let userId = req.query.userId;
  try {
    // Top 5 contacts
    let user = await User.findById(userId).populate({
      path: "contacts",
      perDocumentLimit: 10,
      select: ["fullName", "phoneNumber"],
    });

    if (!user) {
      throw format_error(ERROR_CODES.ID_NOT_FOUND);
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/retrieve_user_by_phone_number", async (req, res, next) => {
  let phoneNumber = req.query.phoneNumber;
  try {
    let user = await User.findOne({ phoneNumber: phoneNumber }).populate({
      path: "contacts",
      perDocumentLimit: 10,
      select: ["fullName", "phoneNumber"],
    });

    if (!user) {
      throw format_error(ERROR_CODES.PHONE_NUMBER_NOT_FOUND);
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    return next(error);
  }
});

router.get("/retrieve_contacts", async (req, res, next) => {
  let userId = req.query.userId;
  try {
    let user = await User.findById(userId).populate({
      path: "contacts",
      perDocumentLimit: 10,
      select: ["_id", "fullName", "phoneNumber"],
    });

    if (!user) {
      throw format_error(ERROR_CODES.ID_NOT_FOUND);
    } else {
      res.status(200).json(user.contacts);
    }
  } catch (error) {
    return next(error);
  }
});

router.get("/retrieve_transactions", async (req, res, next) => {
  let userId = req.query.userId;
  try {
    // all transactions
    let transactions = await Transaction.find({
      $or: [{ sender: userId }, { receiver: userId }],
      isFulfilled: true,
    })
      .populate({ path: "sender", select: ["fullName", "_id"] })
      .populate({ path: "receiver", select: ["fullName", "_id"] });

    if (transactions.length === 0) res.status(200).send([]);
    else res.status(200).send(transactions);
  } catch (error) {
    next(error);
  }
});

router.get("/search_users", async (req, res, next) => {
  let query = req.query.query;
  try {
    // all transactions
    const result = await User.aggregate()
      .search({
        index: "default",
        compound: {
          should: [
            {
              autocomplete: {
                query: query,
                path: "firstName",
                fuzzy: { maxEdits: 1 },
              },
            },
            {
              autocomplete: {
                query: query,
                path: "lastName",
                fuzzy: { maxEdits: 1 },
              },
            },
            {
              autocomplete: {
                query: query,
                path: "fullName",
                fuzzy: { maxEdits: 1 },
              },
            },
            {
              autocomplete: {
                query: query,
                path: "phoneNumber",
                fuzzy: { maxEdits: 1 },
              },
            },
          ],
        },
      })
      .project({
        firstName: 1,
        lastName: 1,
        fullName: 1,
        phoneNumber: 1,
        _id: 1,
      });
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

// NOT DONE
router.get("/retrieve_user_with_certain_fields", async (req, res, next) => {
  let userId = req.query.userId;
  try {
    let user = await User.findById(userId).populate({
      // 5 most recent contacts
      path: "contacts",
      perDocumentLimit: 5,
      select: ["fullName", "phoneNumber"],
    });

    if (!user) {
      return res.status(404).json({
        error_code: "USER_NOT_FOUND",
        message: `User with ID ${userId} not found`,
      });
    }
    // Find all transactions within 2 months
    let transactions = await Transaction.find({
      $or: [{ sender: userId }, { receiver: userId }],
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

    res.status(200).json(user);
    // res.status(200).send(transactions);
  } catch (error) {
    next(error);
  }
});

router.patch("/add_card", async (req, res, next) => {
  let userId = req.body.userId;
  try {
    let user = await User.findById(userId);

    if (!user) {
      throw format_error(ERROR_CODES.ID_NOT_FOUND);
    }

    const newCard = await user.cards.create({
      name: req.body.name,
      accountHolder: req.body.accountHolder,
      cardNumber: req.body.cardNumber,
      cardType: req.body.cardType.toLowerCase(),
      expDate: req.body.expDate,
      cvv: req.body.cvv,
      billingAddress: req.body.billingAddress,
    });

    // Check if card number already exists
    const card = await User.findOne(
      {
        _id: userId,
      },
      {
        cards: {
          $elemMatch: {
            $or: [{ cardNumber: req.body.cardNumber }, { name: req.body.name }],
          },
        },
      }
    );

    if (card.cards.length != 0) {
      throw format_error(ERROR_CODES.DUPLICATE_KEY, "Card");
    } else {
      await user.cards.addToSet(newCard);
      await user.save();
      res.status(200).json(newCard);
    }
  } catch (error) {
    next(error);
  }
});

router.patch("/remove_card", async (req, res, next) => {
  let userId = req.body.userId;
  let cardId = req.body.cardId;
  // let cardNumber = req.body.cardNumber;
  //card.expDate = Date(card.expDate);
  // console.log(cardNumber);
  try {
    let user = await User.findById(userId);
    if (!user) {
      throw format_error(ERROR_CODES.ID_NOT_FOUND);
    }

    await user.cards.pull(cardId);
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.patch(
  "/set_profile_pic",
  upload.single("profilePicture"),
  async (req, res, next) => {
    console.log("head", req.headers);
    console.log("body", req.body);
    console.log("data", res.data);
    console.log("file", req.file);
    let userId = req.body.userId;
    const { originalname, buffer } = req.file;

    const params = {
      Bucket: "digicfa-profilepics",
      Key: originalname,
      Body: buffer,
    };

    try {
      let user = await User.findById(userId);
      if (!user) {
        throw format_error(ERROR_CODES.ID_NOT_FOUND);
      }

      await uploadToS3(params);

      // console.log("Unique key: ", originalname);
      user.profilePicture = profilePicBaseURL + originalname;
      await user.save();

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.patch("/add_balance", async (req, res, next) => {
  let userId = req.body.userId;
  try {
    let user = await User.findById(userId);
    if (!user) {
      throw format_error(ERROR_CODES.ID_NOT_FOUND);
    }

    user.balance += req.body.amount;

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

// ------------------------
// OBSOLETE ONES
// ------------------------

// OBSOLETE
router.get("/retrieve_all_transactions", async (req, res) => {
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
router.get("/retrieve_transactions/:transaction_status", async (req, res) => {
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
});

// OBSOLETE
router.patch("/add_contact", async (req, res) => {
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
router.patch("/remove_contact", async (req, res) => {
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

// OBSOLETE
router.get("/transaction_data", async (req, res) => {
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

export default router;
