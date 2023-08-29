// Imported and automatically enables functionality; responsibile for enhancing stack traces in error messages
// HOWEVER DOESN'T WORK
// import 'source-map-support/register'

import serverlessExpress from "@vendia/serverless-express";
import app from "./index.js";
import { createMongooseConnection } from "./database/connect.js";

let serverlessExpressInstance;

async function setup(event, context) {
  context.callbackWaitsForEmptyEventLoop = false;

  // Creating a new connection or reusing
  await createMongooseConnection();

  // console.log(process.env.MONGODB_CONNECTION_STRING)

  serverlessExpressInstance = serverlessExpress({ app });
  return serverlessExpressInstance(event, context);
}

export function handler(event, context) {
  if (serverlessExpressInstance)
    return serverlessExpressInstance(event, context);

  return setup(event, context);
}
