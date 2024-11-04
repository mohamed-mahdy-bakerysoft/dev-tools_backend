import { ObjectId } from "mongodb";

export default interface CategoryModel {
  _id?: ObjectId;
  displayName: string;
  iconUrl: string;
  value: string;
  index: number;
}