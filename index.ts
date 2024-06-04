import { PutObjectCommandInput, S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import * as archiver from 'archiver';
import * as path from 'path';
import * as stream from 'stream';
import { pipeline } from 'stream';

import {
  AWS_ACCESS_KEY_ID,
  AWS_BUCKET,
  AWS_REGION,
  AWS_SECRET_ACCESS_KEY,
} from './config';

const s3Client = new S3Client([
  {
    region: AWS_REGION,
    credentials: {
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
    },
  },
]);

const targetDirectory = path.join(__dirname, 'images/targets');

const main = async () => {
  const archive = archiver('zip', { zlib: { level: 9 } });
  const { PassThrough } = stream;
  const passThrough = new PassThrough();

  archive.on('error', (err) => {
    console.log('archive error', err);
    throw err;
  });

  archive.directory(targetDirectory, false);

  // pipeline 을 통해 archive 를 passThrough 로 전달, 읽기 스트림 으로 변환
  pipeline(archive, passThrough, (err) => {
    if (err) {
      console.log('pipeline error', err);
      throw err;
    }
  });

  archive.finalize().then(() => {
    passThrough.end();
  });

  const uploadedName = `images.zip`;
  const params: PutObjectCommandInput = {
    Bucket: AWS_BUCKET,
    Key: uploadedName,
    Body: passThrough,
  };

  const uploader = new Upload({
    client: s3Client,
    params,
  });

  uploader.on('httpUploadProgress', (progress) => {
    console.log('upload progress', progress);
  });

  await uploader.done();
};

main()
  .then(() => {
    console.log('done');
  })
  .catch(console.error);
