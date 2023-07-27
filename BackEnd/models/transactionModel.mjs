import mongoose from "mongoose";


const transactionSchema = new mongoose.Schema({
    amountTransferred: {
        type: Number,
        min: 0.01
    },
    sender: {
        type: mongoose.ObjectID,
        required: true
    },
    receiver: {
        type: mongoose.ObjectID,
        required: true
    },
    transactionDate: Date, // 0 request, 1 payment
    isPayment: Boolean, // 0 not approved, 1 approved
    isApproved: Boolean,
    message: String
})


