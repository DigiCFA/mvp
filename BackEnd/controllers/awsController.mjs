
import { PutObjectCommand, CreateBucketCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../config/awsConfig.js";

const BUCKET_NAME = "digicfa-profilepics"


export const uploadToS3 = async(file, bucketName, key) => {
    const params = {
        Bucket: bucketName,
        Key: key,
        Body:file.buffer,
    };

    try {
        const command = new PutObjectCommand(params);
        const response = await s3Client.send(command);
        console.log("Successfully created" + params.Key + " and uploaded to " + params.Bucket + "/" + params.Key);
        return response;
    } catch (error) {
        console.error(error);
    }
}

