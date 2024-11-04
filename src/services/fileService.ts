import { getDB } from "../config/mongodb";
import FileModel from "../models/fileModel";

const collectionName = 'files';

async function create(file: FileModel): Promise<FileModel> {
  const res = await getDB().collection<FileModel>(collectionName).insertOne(file);
  return { _id: res.insertedId, ...file };
}
export default { create };
