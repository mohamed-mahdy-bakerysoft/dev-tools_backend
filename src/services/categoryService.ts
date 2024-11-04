import { ObjectId } from "mongodb";
import { getDB } from "../config/mongodb";
import CategoryModel from '../models/categoryModel';

const collectionName = 'categories';

async function create(tool: CategoryModel): Promise<CategoryModel> {
  const res = await getDB().collection<CategoryModel>(collectionName).insertOne(tool);
  // console.log(res.acknowledged);
  return { _id: res.insertedId, ...tool };
}

async function findOne(id: string): Promise<CategoryModel | null> {
  const res = await getDB().collection<CategoryModel>(collectionName).findOne({ _id: new ObjectId(id) });
  return res;
}

async function findMany(): Promise<CategoryModel[]> {
  const res = await getDB().collection<CategoryModel>(collectionName).find().toArray();
  return res;
}

async function updateOne(id: string, data: CategoryModel): Promise<CategoryModel | null> {
  const res = await getDB().collection<CategoryModel>(collectionName).findOneAndUpdate({ _id: new ObjectId(id) }, data);
  return res;
}

async function deleteOne(id: string): Promise<boolean> {
  const res = await getDB().collection<CategoryModel>(collectionName).deleteOne({ _id: new ObjectId(id) })
  return res.deletedCount === 1
}

export default { create, findOne, findMany, updateOne, deleteOne };
