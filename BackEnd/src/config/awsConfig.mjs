
import { S3Client } from "@aws-sdk/client-s3";

// Setting the AWS Region
const REGION = "us-west-1";

// Create S3 service client object
export const client = new S3Client({region: REGION});
