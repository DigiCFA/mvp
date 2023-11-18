import mongoose from "mongoose";
import moneySchema from "userModel.mjs";

const transactionSchema = new mongoose.Schema({
    amountTransferred: {
        type: moneySchema,
        required: true
    },
    sender: {
        type: mongoose.ObjectId,
        ref: 'User',
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    receiver: {
        type: mongoose.ObjectId,
        ref: 'User',
        required: true
    },
    transactionDate: Date, 
    isPayment: {
        type: Boolean,
        default: 1
        // 0 request, 1 payment
    }, 
    isFulfilled: {
        type: Boolean, 
        default: function() {
            if (this.isPayment) return 1;
            else return 0;
        }
        // If payment, default to fulfilled. If request, default to unfulfilled. 
    }, 
    message: {
        type: String,
        trim: true
    }
})

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;

