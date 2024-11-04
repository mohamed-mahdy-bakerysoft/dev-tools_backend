import { ObjectId } from "mongodb";
import CategoryModel from "./categoryModel";

export default interface ToolModel {
  _id?: ObjectId;
  title: string;
  summary: string;
  description: string;
  cover: string;
  categories: CategoryModel[];
  tags: string[];
  isFavorite: boolean;
  url: string;
  created_at: Date;
}