import { S3 } from 'aws-sdk';
import { NextApiRequest, NextApiResponse } from 'next';
// Create S3 instance
const s3 = new S3({
  region: 'us-east-1',
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
});
// Export config to set sizelimit of files

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
  }
  try {
    const { name, type } = req.body;
    const fileParams = {
      Bucket: process.env.BUCKET_NAME,
      Key: name,
      Expires: 600,
      ContentType: type,
      ACL: 'public-read',
    };
    const url = await s3.getSignedUrlPromise('putObject', fileParams);
    res.status(200).json({ url });
  } catch (err) {
    res.status(400).json({ message: err });
  }
}
