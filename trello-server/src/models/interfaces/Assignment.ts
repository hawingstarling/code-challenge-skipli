import BaseModel from "./BaseModel";

export default interface Assignment extends BaseModel {
  taskId: string;
  memberId: string;
  assignedAt?: string;
}