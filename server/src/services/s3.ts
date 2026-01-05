import { S3Client, PutObjectCommand, ListObjectVersionsCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
    }
});

const BUCKET_NAME = process.env.AWS_BUCKET_NAME || '';

export const generateUploadUrl = async (key: string, contentType: string) => {
    const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
        ContentType: contentType
    });
    return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
};

export const listFileVersions = async (prefix?: string) => {
    const command = new ListObjectVersionsCommand({
        Bucket: BUCKET_NAME,
        Prefix: prefix
    });
    const response = await s3Client.send(command);
    return response.Versions;
};
