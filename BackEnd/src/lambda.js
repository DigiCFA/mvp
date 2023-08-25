
// Imported and automatically enables functionality; responsibile for enhancing stack traces in error messages 
// HOWEVER DOESN'T WORK
// import 'source-map-support/register'

import serverlessExpress from "@vendia/serverless-express"

import app from "./index.js"

export const handler = serverlessExpress({ app })
