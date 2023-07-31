import mongoose from "mongoose";
// import User from "userModel.mjs";


const transactionSchema = new mongoose.Schema({
    amountTransfered: {
        type: Number,
        min: 0.01
    },
    sender: {
        type: mongoose.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: mongoose.ObjectId,
        ref: 'User',
        required: true
    },
    transactionDate: Date, 
    isPayment: Boolean, // 0 request, 1 payment
    isApproved: Boolean,  // 0 not approved, 1 approved
    message: {
        type: String,
        trim: true
    }
})

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;

