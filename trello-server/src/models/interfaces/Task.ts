import BaseModel from "./BaseModel";
import User from "./User";

export type TaskStatus = 'todo' | 'in_progress' | 'in_review' | 'done' | string;

export default interface ITask extends BaseModel {
  cardId: string;
  title?: string;
  description?: string;
  ownerId: string;
  assigness?: User[];
  priority?: "low" | "high" | "medium";
  stautus?: TaskStatus;
  dueDate?: string | null;
}