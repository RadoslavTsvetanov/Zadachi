import AWS from "aws-sdk";
import { Readable } from "stream";
import fs from "fs";
import path from "path";
import { promisify } from "util";
import dotenv from "dotenv";
// ! if a file is not being uploaded try changing the name with something unique
dotenv.config();

const { S3_USER_CLIENT, S3_USER_SECRET, S3_BUCKET_NAME, S3_REGION } =
  process.env;

if (!S3_USER_SECRET) {
  throw new Error("Missing required S3 environment variables");
}

if (!S3_USER_CLIENT) {
  throw new Error("Missing required S3 environment variables");
}

if (!S3_REGION) {
  throw new Error("Missing required S3 environment variables");
}

if (!S3_BUCKET_NAME) {
  throw new Error("Missing required S3 environment variables");
}

const s3 = new AWS.S3({
  accessKeyId: S3_USER_CLIENT,
  secretAccessKey: S3_USER_SECRET,
  region: S3_REGION,
});

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

interface UploadParams {
  Bucket: string;
  Key: string;
  Body: fs.ReadStream;
  ACL?: string;
}

const getAllFiles = async (dirPath: string): Promise<string[]> => {
  const items = await readdir(dirPath);
  const files = await Promise.all(
    items.map(async (item): Promise<string | string[]> => {
      const fullPath = path.join(dirPath, item);
      const itemStat = await stat(fullPath);
      return itemStat.isDirectory() ? await getAllFiles(fullPath) : fullPath;
    })
  );
  return files.flat() as string[];
};

const uploadFile = async (
  fileStream: any,
  tshirtName: string,
  bucketName: string,
  keyPrefix: string
): Promise<void> => {
  const uploadParams: UploadParams = {
    Bucket: bucketName,
    Key: `${keyPrefix}/${tshirtName}`,
    Body: fileStream,
    ACL: "public-read",
  };

  try {
    const data = await s3.upload(uploadParams).promise();
    console.log("Upload Success", data.Location);
  } catch (err) {
    console.error("Error", err);
  }
};

const UploasdTshirt = async (
  fileStream: any,
  t_shirt_name: string
): Promise<void> => {
  const response = await uploadFile(
    fileStream,
    t_shirt_name,
    S3_BUCKET_NAME,
    "tshirts"
  );
};

const getAllS3Items = async (
  prefix: string,
  bucketName: string
): Promise<string[]> => {
  const params = {
    Bucket: bucketName,
    Prefix: prefix,
  };

  try {
    const data = await s3.listObjectsV2(params).promise();

    const allKeys =
      data.Contents?.filter(
        (obj): obj is { Key: string } => obj.Key !== undefined
      )
        .map((obj) => obj.Key)
        .map((filename) => {
          return filename.substring(filename.indexOf("/") + 1, filename.length);
        }) || [];

    const existingFiles = allKeys.filter((file) => {
      return file.length > 0;
    });
    return existingFiles;
  } catch (err) {
    console.error("Error listing S3 items:", err);
    return [];
  }
};

getAllS3Items("men/", S3_BUCKET_NAME).then((data) => {});

export const S3 = {
  UploasdTshirt,
  getAllS3Items,
};
