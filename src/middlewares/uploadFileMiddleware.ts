import { NextFunction, Request, Response } from 'express';
import multer, { StorageEngine } from 'multer';
import path from 'path';
import FileModel from '../models/fileModel';
import fileService from '../services/fileService';
import fs from 'fs';
import dotenv from 'dotenv';
import fileType from 'file-type';
import { ResponseAPI } from '../models/responseAPI';
import * as Utils from '../utils/utils';

// const file = require('file-type') as typeof import('file-type');

dotenv.config();
const NODE_ENV = process.env.NODE_ENV || 'development';

// config storage
const storage: StorageEngine = multer.diskStorage({
  destination: (_req, _file, cb) => {
    if (NODE_ENV == 'production') {
      cb(null, path.join(__dirname, '../public/uploads/icons/'));
    } else {
      cb(null, path.join(__dirname, '../../public/uploads/icons/'));
    }
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

// config filters
const fileFilter = (_req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export const uploadMiddleware = upload.single('file');

export async function uploadIconCategoryMiddleware(req: Request, res: Response, next: NextFunction) {
  const singleUpload = uploadMiddleware;
  singleUpload(req, res, async (err) => {
    if (err) {
      const response: ResponseAPI = {
        success: false,
        message: `${err.message}`,
      }
      return res.status(400).send(response);
    } else {
      try {
        if (!req.file) {
          const response: ResponseAPI = {
            success: false,
            message: 'An unexpected error occurred. Please try again later.',
          }
          return res.status(500).send(response);
        }

        const stats = fs.statSync(req.file.path);
        const fileName = req.file.filename;
        const fileSize = stats.size;
        const fileUrl = Utils.generateStaticUrl(`uploads/icons/${fileName}`);
        const fileTypeMime = await fileType.fromFile(req.file.path);

        const newFile: FileModel = {
          size: fileSize,
          mimeType: fileTypeMime?.mime,
          path: req.file.path,
          url: fileUrl
        }

        req.body.fileUploaded = newFile;

        await fileService.create(newFile);
        next();
      } catch (err) {
        next(err);
      }
    }
  });
}
