
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { client } from "../config/awsConfig.js";
import * as fs from "fs";
import * as path from "path";
import { PROFILE_BUCKET_NAME } from "./awsController.js";

// Part of the debugging process
// Means the AWS Config + S3 isn't broken
const uploadTest = async (filePath) => {
    const fileContent = fs.readFileSync(filePath);
    const fileName = path.basename(filePath);

    const params = {
        Bucket: PROFILE_BUCKET_NAME,
        Key: fileName,
        Body: fileContent
    };

    const command = new PutObjectCommand(params);
    try {
        const response = await client.send(command);
        console.log(response);
    } catch (error) {
        console.error(error);
    }

}

// uploadTest("/Users/OAA/Desktop/im-59211.jpeg");


const buffer = fs.readFileSync('/Users/OAA/Desktop/Jordan-3-534x800.jpg');
console.log("File size: ", buffer.length);
console.log("File buffer snippet: ", buffer.slice(0, 100));