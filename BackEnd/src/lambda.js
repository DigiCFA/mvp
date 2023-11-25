// Imported and automatically enables functionality; responsibile for enhancing stack traces in error messages
// import 'source-map-support/register'
// HOWEVER DOESN'T WORK


import serverlessExpress from "@vendia/serverless-express";
import app from "./index.js";
import { createMongooseConnection } from "./database/connect.js";

let serverlessExpressInstance;

async function setup(event, context) {
  context.callbackWaitsForEmptyEventLoop = false;

  // Creating a new connection or reusing
  await createMongooseConnection();

  serverlessExpressInstance = serverlessExpress({ app });
  return serverlessExpressInstance(event, context);
}

export function handler(event, context) {
  console.log("Running lambda version: " + context.functionVersion);

  // If instance running, return
  if (serverlessExpressInstance)
    return serverlessExpressInstance(event, context);

  // If no current instance, see if creating a new connection or reusing prev conn
  return setup(event, context);
}
