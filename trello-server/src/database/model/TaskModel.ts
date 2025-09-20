import { Collection, IEntity } from "fireorm";
import User from "./UserModel";


export const TaskModelName = "task";

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
export type TaskStatus = 'todo' | 'in_progress' | 'in_review' | 'done' | string;

@Collection(TaskModelName)
export default class Task implements IEntity {
  id!: string;
  cardId!: string;
  title?: string;
  description?: string;
  ownerId!: string;
  assigness?: User[] = [];
  priority?: "low" | "high" | "medium";
  stautus?: TaskStatus;
  dueDate?: string | null;
  
  createdAt?: Date;
  updatedAt?: Date;
}