import Task, { TaskStatus } from "./interfaces/Task";
import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Timestamp } from "@google-cloud/firestore";
import UserModel from "./UserModel";

export default class TaskModel implements Task {
  id!: string;

  @IsString()
  @IsNotEmpty()
  cardId!: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  ownerId!: string;

  @IsArray()
  @IsOptional()
  assigness?: UserModel[] = [];

  @IsOptional()
  priority?: "low" | "high" | "medium";

  @IsOptional()
  stautus?: TaskStatus;

  @IsOptional()
  dueDate?: string | null;

  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}