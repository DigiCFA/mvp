
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { client } from "../config/awsConfig.mjs";

const BUCKET_NAME = "digicfa-profilepics"


export const uploadToS3 = async(buffer, bucketName, key) => {
    const params = {
        Bucket: bucketName,
        Key: key,
        Body: buffer
    };
    const command = new PutObjectCommand(params);

    try {
        const response = await client.send(command);
        console.log("Successfully created " + params.Key + " and uploaded to " + params.Bucket + "/" + params.Key);
        // console.log(response)
        return response;
    } catch (error) {
        console.error(error);
    }
}


export const retrieveFromS3 = async(bucketName, key) => {
    const params = {
        Bucket: bucketName,
        Key: key,
    };
    const command = new GetObjectCommand(params);

    try {
        const response = await client.send(command);

        const imageBuffer = await new Promise((resolve, reject) => {
            const chunks = [];
            response.Body.on("data", (chunk) => chunks.push(chunk));
            response.Body.on("end", () => resolve(Buffer.concat(chunks)));
            response.Body.on("error", (error) => reject(error));
        });
        return imageBuffer;
    } catch(error) {
        console.error(error);
    }
}