import { MongoClient } from "mongodb";
import mongoose from "mongoose";
// import { ATLAS_URI } from "../../config.mjs";


// Mongoose automatically manages connection pool underneath the hood

let conn = null;

export async function createMongooseConnection() {

  // conn could be retained between function calls (due to callbackWaitsForEmptyEventLoop in Lambda.js)
  // to increase efficiency
  if (conn == null) {

    console.log("CREATING NEW MONGOOSE CONNECTION")
    
    conn = mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000
    }).then(() => mongoose);

    // avoid multiple function calls creating new connections
    await conn;
  }

  console.log("Connected to MongoDB.");
  return conn;
}


// export async function closeMongooseConnection(connection) {
//   if (connection) {
//     await connection.close()
//   }
// }