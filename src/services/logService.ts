import { getDB } from "../config/mongodb";

const collectionName = 'logs';

async function create(log: any): Promise<any> {
  const res = await getDB().collection<any>(collectionName).insertOne(log);
  return { _id: res.insertedId, ...log };
}

export default { create };
