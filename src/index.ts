import app from './app';
import dotenv from 'dotenv';
import { connectMongoDB } from './config/mongodb';

dotenv.config();

const SERVER_HOST = process.env.HOST || 'localhost';
const SERVER_PORT = parseInt(process.env.PORT || '3000');

async function startServer() {
  try {
    await connectMongoDB();
    app.listen(SERVER_PORT, SERVER_HOST, () => {
      console.log('server is running ✅:', `${SERVER_HOST}:${SERVER_PORT}`);
    }).on('error', (err: NodeJS.ErrnoException) => {
      console.error('Error starting the server:', err.message);
      // Opcional: Terminar el proceso si el error es crítico
      if (err.code === 'EADDRINUSE') {
        console.error(`Port ${SERVER_PORT} is already in use`);
      }
    });
  } catch (err) {
    console.error('🛑:', err);
    process.exit(1);
  }
}

startServer();