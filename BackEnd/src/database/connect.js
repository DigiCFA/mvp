import { MongoClient } from "mongodb";
import mongoose from "mongoose";
import { ATLAS_URI } from "../../config.mjs";


let conn = null;











// const client = new MongoClient(connect_to_db);

// let connection;
// try {
//   connection = await client.connect();
// } catch (error) {
//   console.error(error);
// }


/* Mongoose has 2 types of errors:
1. Upon initial connection, which we will use try/catch
2. After initial connection has been established, which we listen for error events
*/

try {
  await mongoose.connect(ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch(error) {
  console.error(error);
}


const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB Connection error: "));
db.once("open", function () {
  console.log("Connected to MongoDB.");
});

export function dbRef() {
  return db;
}

// let db = connection.db();
// export function db_ref() {
//   return db;
// }
// export function client_ref() {
//   return client;
// }




