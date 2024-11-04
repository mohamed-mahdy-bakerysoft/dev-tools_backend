import express from 'express';
import dotenv from 'dotenv';
import toolRoutes from './routes/toolRoutes';
import categoryRoutes from './routes/categoryRoutes';
import path from 'path';
import cors from 'cors';
import errorHandler from './middlewares/errorHandler';

const app = express();

dotenv.config();

const API_VERSION = process.env.API_VERSION;
const NODE_ENV = process.env.NODE_ENV || 'development';

if (NODE_ENV == 'production') {
  app.use('/public', express.static(path.join(__dirname, 'public')));
} else {
  app.use('/public', express.static(path.join(__dirname, '../public')));
}

app.use(cors());
app.use(express.json());

app.use(`/api/${API_VERSION}`, toolRoutes);
app.use(`/api/${API_VERSION}`, categoryRoutes);

app.use(errorHandler);

export default app;