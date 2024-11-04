import { ObjectId } from "mongodb";
import { getDB } from "../config/mongodb";
import ToolModel from '../models/toolModel';

const collectionName = 'tools';

async function create(tool: ToolModel): Promise<ToolModel> {
  const res = await getDB().collection<ToolModel>(collectionName).insertOne(tool);
  return { _id: res.insertedId, ...tool };
}

async function findOne(id: string): Promise<ToolModel | null> {
  const res = await getDB().collection<ToolModel>(collectionName).findOne({ _id: new ObjectId(id) });
  return res;
}

async function findMany({ category }: { category?: string } = {}): Promise<ToolModel[]> {
  if (category) {
    const res = await getDB().collection<ToolModel>(collectionName).find({ categories: { $elemMatch: { value: category } } }).toArray();
    return res;
  } else {
    const res = await getDB().collection<ToolModel>(collectionName).find().toArray();
    return res;
  }
}

async function searchDeep(search: string): Promise<ToolModel[]> {
  const res = await getDB().collection<ToolModel>(collectionName).find({
    $or: [
      { title: { $regex: search, $options: 'i' } },
      { summary: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { tags: { $elemMatch: { $regex: search, $options: 'i' } } } // Buscar en los elementos del array tags
    ]
  }).toArray();
  return res;
}

async function updateOne(id: string, data: ToolModel): Promise<ToolModel | null> {
  const res = await getDB().collection<ToolModel>(collectionName).findOneAndUpdate({ _id: new ObjectId(id) }, data);
  return res;
}

async function deleteOne(id: string): Promise<boolean> {
  const res = await getDB().collection<ToolModel>(collectionName).deleteOne({ _id: new ObjectId(id) })
  return res.deletedCount === 1
}

async function countDocuments(): Promise<number> {
  const count = await getDB().collection<ToolModel>(collectionName).countDocuments();
  return count;
}

export default { create, findOne, findMany, updateOne, deleteOne, searchDeep, countDocuments };
