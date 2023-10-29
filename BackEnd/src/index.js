import express from "express";
import cors from "cors";
import morgan, { format } from "morgan";
import connectStore from "connect-mongo";
import session from "express-session";
import routes from "./routes/index.js";
import "dotenv/config.js";
import {
  ERROR_CODES,
  ERROR_MESSAGES,
  format_error,
  mapErrorCodeToHttpCode,
  KNOWN_ERROR_CODES,
} from "./utils/errorHandling.js";
import admin from "firebase-admin";

const app = express();

// For logging/debugging
app.use(morgan("tiny"));

app.use(cors());
app.use(express.json());

// Comment out the use of express-session, if you want to test locally

app.use(
  session({
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    store: connectStore.create({
      mongoUrl: process.env.MONGODB_CONNECTION_STRING,
      ttl: parseInt(process.env.SESSION_LIFETIME) / 1000,
      collectionName: "session_store",
    }),
    cookie: {
      sameSite: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: parseInt(process.env.SESSION_LIFETIME),
      httpOnly: true,
    },
  })
);

app.use("/api", routes);

app.use((err, req, res, next) => {
  const recognised = KNOWN_ERROR_CODES.includes(err.code);

  console.log(
    "Error has occured with code",
    err.code,
    recognised ? "ERROR CODE RECOGNISED" : "ERROR CODE UNRECOGNISED"
  );
  if (err.code && !recognised) {
    err.code = ERROR_CODES.UNKNOWN_ERROR;
  }
  let message;

  message = err?.payload
    ? ERROR_MESSAGES[err.code](err.payload)
    : ERROR_MESSAGES[err.code];

  const httpStatus = mapErrorCodeToHttpCode(err.code);
  // console.log("invoked");
  // console.log("This is the full error: ", err);
  // console.log(message)
  res.status(httpStatus).send(message);

  // error_response = {
  //     status: "error",
  //     errorCode: null,
  //     message: null,
  //     details: {}
  // }
});

// import serviceAccount from ("path/to/serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert({
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER,
    client_x509_cert_url: process.env.FIREBASE_CLIENT,
    universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
  }),
});

export default app;
