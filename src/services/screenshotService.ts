import dotenv from 'dotenv';
import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import FileModel from '../models/fileModel';
import fileService from './fileService';
import fileType from 'file-type';
import * as Utils from '../utils/utils';
import { uploadPhoto } from './cloudinaryService';

const NODE_ENV = process.env.NODE_ENV || 'development';

const takeScreenshot = async (url: string, fileName: string): Promise<FileModel> => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  // configura la ruta donde se guardará la imagen
  let filePath;
  if (NODE_ENV == 'production') {
    filePath = path.join(__dirname, '../public/screenshots', fileName);
  } else {
    filePath = path.join(__dirname, '../../public/screenshots', fileName);

  }

  await page.screenshot({ path: filePath });

  const newFile = await uploadPhoto({ filePath: filePath, folderName: 'screenshots' });

  await browser.close();
  return newFile;
};

export default takeScreenshot;
