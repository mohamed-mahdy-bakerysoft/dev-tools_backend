import { ObjectId } from "mongodb";

export default interface FileModel {
  _id?: ObjectId;
  mimeType: string | undefined;
  size: number;
  path: string;
  cloudPath?: string;
  url: string;
}