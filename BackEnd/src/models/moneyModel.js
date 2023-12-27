import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import pkg from "bcryptjs";

import { profilePicBaseURL } from "../config/awsConfig.js";

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
    
  },{_id:false});
  
const moneyModel = new mongoose.Schema({
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
  },{_id:false});
  

export default moneyModel