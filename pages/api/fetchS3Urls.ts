import type { NextApiRequest, NextApiResponse } from 'next'

import aws from 'aws-sdk'
import { S3 } from 'aws-sdk';

const bucketName = "rootvc-dreambooth";
const s3 = new aws.S3();
aws.config.update({
  accessKeyId: process.env.ROOTVC_AWS_ACCESS_KEY,
  secretAccessKey: process.env.ROOTVC_AWS_SECRET_KEY,
  signatureVersion: 'v4',
});

type Data = {
  urls: string[]
}

// TODO: Use this, return it, consume it
// type PhotoObj = {
//   url: string,
//   token: string,
//   createdAt: number,
//   instanceNumber: number
// }

async function listObjects(Bucket: string, Prefix: string, Delimiter: string, data: S3.ObjectList = [], ContinuationToken: string | undefined = undefined): Promise<string[]> {
  const response = await s3.listObjectsV2({ Bucket, Prefix, Delimiter, ContinuationToken }).promise();
  let contents = response.Contents!;
  let urls = contents.map(item => `https://${bucketName}.s3.amazonaws.com/${decodeURI(item.Key!)}`);

  if (response.IsTruncated) { return listObjects(Bucket, Prefix, Delimiter, data, response.NextContinuationToken); }
  return urls;
}

export default async function handler(_req: NextApiRequest, res: NextApiResponse<Data>) {
  let urls = await listObjects(bucketName, "output/", "");
  res.status(200).json({ urls: urls.slice(1, urls.length) });
}
