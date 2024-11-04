import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const SERVER_HOST = process.env.HOST || 'localhost';
const SERVER_PORT = parseInt(process.env.PORT ?? '3000');

app.listen(SERVER_PORT, SERVER_HOST, () => {
  console.log('SERVER IS RUNNING...', `${SERVER_HOST}:${SERVER_PORT}`);
});