
// Imported and automatically enables functionality; responsibile for enhancing stack traces in error messages 
// HOWEVER DOESN'T WORK
// import 'source-map-support/register'

import serverlessExpress from "@vendia/serverless-express"

import app from "./index.js"



// // We only want to create the connection pool once, not every time the function gets a request
// import { MongoClient } from "mongodb"

// const client = new MongoClient(process.env.MONGODB_CONNECTION_STRING);

export const handler = serverlessExpress({ app })
