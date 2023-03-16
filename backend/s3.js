const aws = require('aws-sdk')
const dotenv = require('dotenv')

dotenv.config(); 

const region = 'us-west-1';
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const bucketName = 'popblock';

const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4'
})

async function generateUploadURL() {
    const imageName = Math.random().toString(36).substring(7);
    const uploadURL = s3.getSignedUrlPromise('putObject', {
        Bucket: bucketName,
        Key: imageName,
        Expires: 60
    })
    return uploadURL;
}

module.exports = {generateUploadURL}