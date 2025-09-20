import { Timestamp } from "@google-cloud/firestore";

export default interface BaseModel {
  id: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}