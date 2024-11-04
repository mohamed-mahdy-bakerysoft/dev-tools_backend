import dotenv from 'dotenv';
import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import FileModel from '../models/fileModel';
import fileService from './fileService';
import fileType from 'file-type';
import * as Utils from '../utils/utils';

dotenv.config();

const NODE_ENV = process.env.NODE_ENV || 'development';

const takeScreenshot = async (url: string, fileName: string): Promise<string> => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  // Configura la ruta donde se guardará la imagen
  let filePath;
  if (NODE_ENV == 'production') {
    filePath = path.join(__dirname, '../public/screenshots', fileName);
  } else {
    filePath = path.join(__dirname, '../../public/screenshots', fileName);

  }

  await page.screenshot({ path: filePath });

  const stats = fs.statSync(filePath);
  const fileSize = stats.size;
  const fileUrl = Utils.generateStaticUrl(`screenshots/${fileName}`);
  const fileTypeMime = await fileType.fromFile(filePath);

  const newFile: FileModel = {
    size: fileSize,
    mimeType: fileTypeMime?.mime,
    path: filePath,
    url: fileUrl
  }

  await fileService.create(newFile);

  await browser.close();
  return fileUrl;
};

export default takeScreenshot;
