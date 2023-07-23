import mongoose from "mongoose";

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
  passWord: {
    type: String,
    required: [true, "Please enter a valid password"]
  }, 
  QRCode: String,
  balance: {
    type: Number,
    default: 0
  },
  // Look into cards
  cards: [{}],
  privacyPreferences: [String],
  contacts: [ObjectId],
  transactions: [ObjectId],
  receivedTransactions: [ObjectId],
  sentTransactions: [ObjectId],
  receivedRequests: [ObjectId],
  sentRequests: [ObjectId],
});

const User = mongoose.model("User", userSchema);

export default User;