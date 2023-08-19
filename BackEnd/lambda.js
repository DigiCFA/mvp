require('source-map-support/register')
const serverlessExpress = require('@vendia/serverless-express')
// const app = require('./app')


import app from "server.mjs"

exports.handler = serverlessExpress({ app })
