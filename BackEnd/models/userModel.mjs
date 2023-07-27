import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  accountHolder: {
    type: String,
    required: true
  },
  cardNumber: {
    type: Number,
    required: true
  },
  expDate: {
    type: Date,
    required: true
  },
  secCode: {
    type: Number,
    required: true
  }
})

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    index: true,
    required: [true, "Please enter your name"],
  },
  phoneNumber: {
    type: Number,
    index: true,
    unique: true,
    required: [true, "Please enter a phone number"]
  },
  password: {
    type: String,
    required: [true, "Please enter a valid password"]
  }, 
  QRCode: String,
  balance: {
    type: Number,
    default: 0,
    min: 0
  },
  cards: [cardSchema],
  privacyPreferences: [String],
  contacts: [mongoose.ObjectId],
  transactions: [mongoose.ObjectId],
  profilePicture: {
    type: String,
    // GETTER - define root as where images are stored
    get: v => `${root}${v}`
  },
  creationDate: Date

  /* Don't think they are useful -> can make aggregations very easily
  receivedTransactions: [mongoose.ObjectId],  
  sentTransactions: [mongoose.ObjectId],
  receivedRequests: [mongoose.ObjectId],
  sentRequests: [mongoose.ObjectId],
  */
}, 
// Useful if want to create Redacted User view
// {autoCreate: false, autoIndex: false}
);

// for the 'users' collection
// Mongoose automatically looks for the all-case/plural nameed collection in the database
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