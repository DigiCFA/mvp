import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import pkg from "bcryptjs";

import { profilePicBaseURL } from "../config/awsConfig.js";

//import search from "mongoose-fuzzy-searching"

const { hashSync, compareSync } = pkg;
// import Transaction from "transactionModel.mjs"

// var uniqueValidator = require('mongoose-unique-validator');

// Subdocument
const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
    trim: true,
  },
  accountHolder: {
    type: String,
    required: true,
    trim: true,
  },
  cardNumber: {
    type: String,
    required: true,
    index: true,
    trim: true,
    validate: {
      validator: function (v) {
        return /^[0-9 ]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid card number!`,
    },
  },
  cardType: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (v) {
        return /^(savings|credit|debit)+$/.test(v);
      },
    },
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
  billingAddress: {
    type: String,
    required: true,
    trim: true,
  },
});
// Subdocument
const moneySchema = new mongoose.Schema({
  amount: {
    type: Number,
    default: 0,
    min: 0,
    required: true,
    // index: true,
    trim: true,
  },
  currency: {
    type: currencySchema,
    required: true,
    trim: true,
  },
  scale: {
    type: Number,
    required: true,
    // index: true,
    trim: true,
  },
});

// Subdocument
const currencySchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    // index: true,
    trim: true,
  },
  base: {
    type: Number,
    required: true,
    trim: true,
  },
  exponent: {
    type: Number,
    required: true,
    // index: true,
    trim: true,
    
  },
  
});
const addressSchema = new mongoose.Schema({
  lineOne: {
    type: String,
    required: true,
    default: "Not set",
  },
  lineTwo: {
    type: String,
    required: true,
    default: "Not set",
  },
  city: {
    type: String,
    required: true,
    default: "Not set",
  },
  zipCode: {
    type: String,
    required: true,
    default: "Not set",
  },
});

const tokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  timeStamp: {
    type: Date,
    required: true,
  },
});

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please enter your first name"],
      trim: true,
      validate: {
        validator: function (v) {
          return /^[a-zA-Z ]*$/.test(v);
        },
        message: "Must be all characters",
      },
    },
    lastName: {
      type: String,
      required: [true, "Please enter your last name"],
      trim: true,
      validate: {
        validator: function (v) {
          return /^[a-zA-Z ]*$/.test(v);
        },
        message: "Must be all characters",
      },
    },
    fullName: {
      type: String,
      index: true,
    },
    phoneNumber: {
      type: String,
      index: true,
      unique: true,
      required: [true, "Must have a primary phone number"],
      trim: true,
      validate: {
        validator: function (v) {
          return /^[0-9 +]+$/.test(v);
        },
        message: "Must be all numbers (or plus)",
      },
    },
    phoneNumbers: {
      type: [String],
      index: true,
      required: [true, "Phone number list cannot be empty"],
      trim: true,
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
      type: moneySchema,
      required: true,
      
    },
    cards: [cardSchema],
    privacyPreferences: [String],
    contacts: [
      {
        type: mongoose.ObjectId,
        ref: "User",
      },
    ],
    tokens: [tokenSchema],
    /*
    - NO TRANSACTIONS POINTER
    - Doc suggested that in one-to-many relationships, don't keep two pointers (i.e. user->transaction && transaction->user) as they may get out of sync or unusually large
    - SHOULD just have a parent pointer from the 'many' side. Can add it as a virtual.
    */

    profilePicture: {
      type: String,
      default: profilePicBaseURL + "default.png",
    },
    addresses: [addressSchema],
    // primaryAddress: Number,
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
//userSchema.plugin(search,{fields:['firstName','lastName','fullName,phoneNumber']});

userSchema.pre("save", function () {
  if (this.isModified("password")) {
    this.password = hashSync(this.password, 10);
  }
});

userSchema.statics.fieldDoesNotExist = async function (field) {
  return (await this.where(field).countDocuments()) === 0;
};

userSchema.methods.comparePasswords = function (password) {
  return compareSync(password, this.password);
};

// for the 'users' collection
// Mongoose automatically looks for the all-case/plural named collection in the database
const User = mongoose.model("User", userSchema);

// OBSOLETE

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
