import mongoose from "mongoose";
// import Transaction from "transactionModel.mjs"


// Subdocument
const cardSchema = new mongoose.Schema({
  accountHolder: {
    type: String,
    required: true
  },
  cardNumber: {
    type: String,
    required: true
  },
  expDate: {
    type: Date,
    required: true
    // Validation: before Date.now()
  },
  cvv: {
    type: String,
    required: true,
    validate: {
      validator: function(str) {
        return str.length > 2 && str.length < 5
      },
      message: "Must be 3 or 4 digits."
    }
    
  }
})

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    index: true,
    required: [true, "Please enter your name"],
  },
  phoneNumber: {
    type: String,
    index: true,
    unique: true,
    required: [true, "Please enter a phone number"]
  },
  password: {
    type: String,
    required: [true, "Please enter a valid password"]
  }, 
  QRCode: {
    type: String,
    unique: true
  },
  balance: {
    type: Number,
    default: 0,
    min: 0
  },
  cards: [cardSchema],
  privacyPreferences: [String],
  contacts: [{
    type: mongoose.ObjectId,
    ref: 'User'
  }],

  // Doc suggested that in one-to-many relationships, don't keep two pointers (i.e. user->transaction + transaction->user) as they may get out of sync
  // SHOULD just have a parent pointer from the 'many' side. Can add it as a virtual.
  /*
  transactions: [{
    type: mongoose.ObjectId,
    ref: 'Transaction'
  }],
  */
  profilePicture: {
    type: String,
    // GETTER - define root as where images are stored
    get: v => `${root}${v}`
  },
  creationDate: Date
}, 
// Useful if want to create Redacted User view
// {autoCreate: false, autoIndex: false}
);


// userSchema.virtual('transactions', {
//   ref: 'Transactions',
//   localField: '_id',
//   foreignField: 'user'
// })




// for the 'users' collection
// Mongoose automatically looks for the all-case/plural named collection in the database
const User = mongoose.model("User", userSchema);





// < --------- Redacted User -------->
// To hide sensitive information in the form of a 'view' of user model


const RedactedUser = mongoose.model('RedactedUser', userSchema);

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