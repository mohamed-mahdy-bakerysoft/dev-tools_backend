import mongodb, { MongoClient } from "mongodb";

const DATABASE_PORT = process.env.DATABASE_PORT;
const DATABASE_HOST = process.env.DATABASE_HOST;
const DATABASE_NAME = process.env.DATABASE_NAME;
const NODE_ENV = process.env.NODE_ENV || 'development';

// const uri = "mongodb+srv://<db_username>:<db_password>@cluster0.mtt2o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

let mongodb_uri: string;
if (NODE_ENV == 'production') {
  mongodb_uri = `mongodb+srv://${DATABASE_HOST}`
} else {
  mongodb_uri = `mongodb://${DATABASE_HOST}:${DATABASE_PORT}`
}

let db: mongodb.Db;

export async function connectMongoDB() {
  try {
    const client = new MongoClient(mongodb_uri);
    await client.connect();
    db = client.db(DATABASE_NAME);
    console.log('database was connected successfully ✅');
  } catch (err) {
    console.log('database was NOT connected 🛑');
    throw (err);
  }
}

export function getDB(): mongodb.Db {
  return db;
}