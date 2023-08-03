import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
// import Transaction from "transactionModel.mjs"

// var uniqueValidator = require('mongoose-unique-validator');

// Subdocument
const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
    trim: true
  },
  accountHolder: {
    type: String,
    required: true,
    trim: true
  },
  cardNumber: {
    type: String,
    required: true,
    index: true,
    trim: true,
    validate: {
      validator: function(v) {
        return /^[0-9 ]+$/.test(v);
      },
      message: props =>`${props.value} is not a valid card number!`
    }
  },
  cardType: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function(v) {
        return /^(savings|credit|debit)+$/.test(v);
      }
    }
  },
  expDate: {
    type: Date,
    required: true,
    min: Date.now(),
  },
  cvv: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (v) {
        return /^\d{3,4}$/.test(v);
      },
      message: "Must be 3 or 4 digits.",
    },
  },
});

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please enter your first name"],
      trim: true,
      validate: {
        validator: function(v) {
          return /^[a-zA-Z ]*$/.test(v);
        },
        message: "Must be all characters"
      }
    },
    lastName: {
      type: String,
      required: [true, "Please enter your last name"],
      trim: true,
      validate: {
        validator: function(v) {
          return /^[a-zA-Z ]*$/.test(v);
        },
        message: "Must be all characters"
      }
    },
    fullName: {
      type: String,
      index: true,
    },
    phoneNumber: {
      type: String,
      index: true,
      unique: true,
      required: [true, "Please enter a phone number"],
      trim: true,
      validate: {
        validator: function(v) {
          return /^[0-9 +]+$/.test(v);
        },
        message: "Must be all numbers (or plus)"
      }
    },
    password: {
      type: String,
      required: [true, "Please enter a valid password"],
      trim: true,
    },
    QRCode: {
      type: String,
      // GETTER - define root as where images are stored
      get: (val) => `{root}${val}`,
    },
    balance: {
      type: Number,
      default: 0,
      min: 0,
    },
    cards: [cardSchema],
    privacyPreferences: [String],
    contacts: [
      {
        type: mongoose.ObjectId,
        ref: "User",
      },
    ],

    /*
    - NO TRANSACTIONS POINTER
    - Doc suggested that in one-to-many relationships, don't keep two pointers (i.e. user->transaction && transaction->user) as they may get out of sync or unusually large
    - SHOULD just have a parent pointer from the 'many' side. Can add it as a virtual.
    */

    profilePicture: {
      type: String,
      get: (val) => `${root}${val}`,
    },
    creationDate: Date,
  }
  // Useful if want to create Redacted User view
  // {autoCreate: false, autoIndex: false}
);

// userSchema.virtual('transactions', {
//   ref: 'Transactions',
//   localField: '_id',
//   foreignField: 'user'
// })

userSchema.plugin(uniqueValidator);

// for the 'users' collection
// Mongoose automatically looks for the all-case/plural named collection in the database
const User = mongoose.model("User", userSchema);

// < --------- Redacted User -------->
// To hide sensitive information in the form of a 'view' of user model

const RedactedUser = mongoose.model("RedactedUser", userSchema);

// await RedactedUser.createCollection({
//   viewOn: 'users',
//   pipeline: [{
//     $set: {
//       name: { $concat: [{$substr: ['$name', 0, 3]}, '...']},
//       phoneNumber: { $concat: [{$substr: ['$phoneNumber', 0, 3]}, '...']}
//     }
//   }]
// })


export default User;
