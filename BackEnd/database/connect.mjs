import { MongoClient } from "mongodb";
const connect_to_db = process.env.ATLAS_URI || "";
console.log(`Server is running on port: ${connect_to_db}`)
const client = new MongoClient(connect_to_db);





let connection;
try{
    connection = await client.connect();
}
catch(error){
    console.error(error);
}

let db = connection.db();
export default db;