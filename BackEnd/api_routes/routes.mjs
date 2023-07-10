import express from "express";
import {db,client} from "../database/connect.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();


router.get("/",async(req,res) => {
    let collection = await db.collection("records");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
})



router.post("/auth/create_user",async(req,res) => {
    let collection = await db.collection("users");
    let user_data = req.body;
    collection.insertOne(
    {
            user_name:user_data.user_name,
            user_phone_number:user_data.user_phone_number,
            user_password:user_data.user_password,
            user_QRCode: user_data.user_QRCode,
            user_balance: user_data.user_balance,
            user_card_info:[],
            privacy_preference:user_data.user_balance,
            user_contacts:[],
            transactions:[],
            requests:[],
            user_creation_date:Date.now()
    })
    res.send(results).status(200);
})
router.post("/auth/user_login",async(req,res) => {
    let collection = await db.collection("users");
    let user_input = req.body;
    let findUser = await collection.findOne({user_phone_number:user_input.user_phone_number},function(error,result){
        if(!error){
            res.send({}).status(200);
        }
        else{
            console.error(error)
            res.send({}).status(400);
        }
    })
})

router.patch("/profile/add_contact",async(req,res)=>{

    let collection = await db.collection("users");
    let user_input = req.body;
    await collection.updateOne({_id:user_input.user_id},{$push:user_input.contact_id},async function(error,result){
        if(!error){
            await collection.updateOne({_id:user_input.contact_id},{$push:user_input.contact_id},function(error,result){
                if(!error){
                
                    res.send({}).status(200);
                }
                else{
                    console.error(error)
                    res.send({}).status(400);
                }
            })            
        }
        else{
            console.error(error)
            res.send({}).status(400);
        }
    })


})


router.patch("/profile/remove_contact",async(req,res)=>{

    let collection = await db.collection("users");
    let user_input = req.body;
    await collection.updateOne({_id:user_input.user_id},{$pull:user_input.contact_id},async function(error,result){
        if(!error){
            await collection.updateOne({_id:user_input.contact_id},{$pull:user_input.contact_id},function(error,result){
                if(!error){
                
                    res.send({}).status(200);
                }
                else{
                    console.error(error)
                    res.send({}).status(400);
                }
            })            
        }
        else{
            console.error(error)
            res.send({}).status(400);
        }
    })


})



router.post("/transaction/create_transaction_request",async(req,res)=>{
    const session = client.startSession();
    let transaction_data = req.body;
    try{
        await session.withTransaction(async()=>{

            let transaction_collection = await db.collection("transactions");
            let users_collection = await db.collection("users");

            await transaction_collection.insertOne({
                amount_transfered:transaction_data.amount_transfered,
                transaction_sender:transaction_data.transaction_sender,
                transaction_receiver:transaction_data.transaction_receiver,
                transaction_date:Date.now(),
                transaction_approved:0,
                transaction_code:1,
                transaction_message: transaction_data.transaction_message
            },async function(error,result){
                if(!error){
                    let transactionID = result.insertedId;
                    await users_collection.updateOne({_id:transaction_data.transaction_sender},
                        {
                            $push:{sent_requests:transactionID}
                        },
                        function(error,result){
                            if(error){
                                console.error(error)
                                res.send({}).status(400);
                            }
                    })
                    await collection.updateOne({_id:transaction_data.transaction_receiver},
                        {
                            $push:{received_requests:transactionID}
                        },
                        function(error,result){
                            if(!error){
                                res.send({}).status(200);
                            }
                            else{
                                console.error(error)
                                res.send({}).status(400);
                            }
                    })
                }
                else{
                    console.error(error)
                    res.send({}).status(400);
                }
            })
        })
    }
    catch(error){
        console.error(error)
        res.send({}).status(400);
    }
    finally{
        await session.endSession()
    }


})



router.patch("/transaction/approve_transaction",async(req,res)=>{

    const session = client.startSession();
    let transaction_data = req.body;
    let transactionID = transaction_data._id;
    try{
        await session.withTransaction(async()=>{
            let transaction_collection = await db.collection("transactions");
            let users_collection = await db.collection("users");
            await collection.findOne({_id:transactionID},
                async function(error,result){
                    if(!error){
                        
                    
                
                        let amount_transfered = result.amount_transfered;
                        let transaction_sender = result.transaction_sender;
                        let transaction_receiver = result.transaction_receiver;
                        await users_collection.findOne({_id:transaction_sender},
                        async function(error,result){
                            if(!error){

                                let current_user_balance = result.user_balance;
                                if(current_user_balance < amount_transfered){
                                    res.send({}).status(400);
                                    return;
                                }

                                await transaction_collection.updateOne(
                                    {_id:transactionID},
                                    {
                                        $set:{transaction_approved:1}
                                    },
                                    async function(error,result){
                                        if(error){
                                            console.error(error)
                                            res.send({}).status(400);
                                        }
                                })
                                await users_collection.updateOne(
                                    {_id:transaction_sender},
                                    {
                                        $pull:{sent_requests:transactionID},
                                        $push:{sent_transactions:transactionID},
                                        $inc: {user_balance: amount_transfered*(-1.0)}
                                    },
                                    async function(error,result){
                                        if(error){
                                            console.error(error)
                                            res.send({}).status(400);
                                        }
                                })

                                await users_collection.updateOne(
                                    {_id:transaction_receiver},
                                    {   
                                        $pull:{received_requests:transactionID},
                                        $push:{received_transactions:transactionID},
                                        $inc: {user_balance: amount_transfered}
                                    },
                                    async function(error,result){
                                        if(!error){
                                            res.send({}).status(200);
                                        }
                                        else{
                                            console.error(error)
                                            res.send({}).status(400);
                                        }
                                })

                            }
                            else{
                                console.error(error)
                                res.send({}).status(400);
                            }
                            

                        })
                    }
                    else{
                        console.error(error)
                        res.send({}).status(400);
                    }
            })
            
        })
    }
    catch(error){
        console.error(error)
        res.send({}).status(400);
    }
    finally{
        await session.endSession()
    }
})



export default router;