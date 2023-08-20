import express from "express";
import cors from "cors";
import morgan from "morgan";
import connectStore from "connect-mongo";
import session from "express-session"
import { ATLAS_URI, NODE_ENV, PORT, SESSION_LIFETIME, SESSION_NAME, SESSION_SECRETE } from "../config.mjs";

import "../loadEnvironment.mjs";
import routes from "./routes/index.mjs";

const app = express();

// For logging/debugging
app.use(morgan('tiny'));

app.use(cors());
app.use(express.json());

app.use(session({
  name: SESSION_NAME,
  secret: SESSION_SECRETE,
  saveUninitialized: false,
  resave: false,
  store: connectStore.create({
    mongoUrl: ATLAS_URI,
    ttl: parseInt(SESSION_LIFETIME) / 1000,
    collectionName: 'session_store'
  }),
  cookie: {
    sameSite: true,
    secure: NODE_ENV === 'production',
    maxAge: parseInt(SESSION_LIFETIME)
  }
}))

app.use("/api", routes);

export default app;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
 