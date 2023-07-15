import { MongoClient } from "mongodb";
const connect_to_db = process.env.ATLAS_URI || "";
const client = new MongoClient(connect_to_db);


let connection;
try{
    connection = await client.connect();
}
catch(error){
    console.error(error);
}

let db = connection.db();
export function db_ref(){
    return db;
}
export function client_ref(){
    return client;
};