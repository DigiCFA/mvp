import express from "express";
import cors from "cors";
import morgan, { format } from "morgan";
import connectStore from "connect-mongo";
import session from "express-session"
import routes from "./routes/index.js";
import 'dotenv/config.js'
import { ERROR_CODES, ERROR_MESSAGES, format_error, mapErrorCodeToHttpCode } from "./utils/errorHandling.js";

const app = express();

// For logging/debugging
app.use(morgan('tiny'));

app.use(cors());
app.use(express.json());

// Comment out the use of express-session, if you want to test locally

app.use(session({
  name: process.env.SESSION_NAME,
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  store: connectStore.create({
    mongoUrl: process.env.MONGODB_CONNECTION_STRING,
    ttl: parseInt(process.env.SESSION_LIFETIME) / 1000,
    collectionName: 'session_store'
  }),
  cookie: {
    sameSite: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: parseInt(process.env.SESSION_LIFETIME),
    httpOnly: true
  }
}))

app.use("/api", routes);

app.use((err, req, res, next) => {

    console.log("invoked")
    console.log(err)
    res.send(err)

    error_response = {
        status: "error",
        errorCode: null,
        message: null,
        details: {}
    }

    if(err.code && err.code in Object.keys(ERROR_CODES)){
        error_response.errorCode = err.code

    }
})

export default app;