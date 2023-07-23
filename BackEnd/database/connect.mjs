import { MongoClient } from "mongodb";
import mongoose from "mongoose";
const uri = process.env.ATLAS_URI || "";


// const client = new MongoClient(connect_to_db);

// let connection;
// try {
//   connection = await client.connect();
// } catch (error) {
//   console.error(error);
// }

try {
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch(error) {
  console.error(error);
}


const db = mongoose.connection;

// Different Lifecycle methods:
db.on("error", console.error.bind(console, "MongoDB Connection error: "));
db.once("open", function () {
  console.log("Connected to MongoDB.");
});

export function db_ref() {
  return db;
}

// let db = connection.db();
// export function db_ref() {
//   return db;
// }
// export function client_ref() {
//   return client;
// }
