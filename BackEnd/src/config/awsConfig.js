
import { S3Client } from "@aws-sdk/client-s3";

// Setting the AWS Region
const REGION = "af-south-1";

// Create S3 service client object
export const client = new S3Client({region: REGION});

export const profilePicBaseURL =
  "https://digicfa-profilepics.s3.af-south-1.amazonaws.com/";

  