import BaseModel from "./BaseModel";
import User from "./User";

export default interface Card extends BaseModel {
  boardId: string;
  name: string;
  description?: string;
  listMember?: User[];
  tasksCount?: number;
  status?: string;
  order: number;
  listId: string;
}