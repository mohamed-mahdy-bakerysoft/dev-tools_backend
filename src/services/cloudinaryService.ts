import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import fileType from 'file-type';
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import FileModel from '../models/fileModel';

dotenv.config();

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

// Configuration
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET
});

export async function uploadPhoto({ filePath, folderName }: { filePath: string, folderName: string | undefined }): Promise<FileModel> {
  const stats = fs.statSync(filePath);
  const fileSize = stats.size;
  const fileTypeMime = await fileType.fromFile(filePath);
  const fileName = path.basename(filePath);
  const fileNameWithoutExt = path.basename(filePath, path.extname(filePath));
  const cloudPath = `dev_tools/${folderName}/${fileName}`;

  const uploadResult = await cloudinary.uploader
    .upload(
      filePath, {
      public_id: fileNameWithoutExt,
      folder: `dev_tools/${folderName}`
    });

  const uploadResponse = uploadResult as UploadApiResponse;

  const newFile: FileModel = {
    size: fileSize,
    mimeType: fileTypeMime?.mime,
    path: filePath,
    url: uploadResponse.url,
    cloudPath: cloudPath
  }

  return newFile;
}