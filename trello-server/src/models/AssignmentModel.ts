import { Timestamp } from "@google-cloud/firestore";
import Assignment from "./interfaces/Assignment";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export default class AssignmentModel implements Assignment {
  id!: string;

  @IsString()
  @IsNotEmpty()
  taskId!: string;

  @IsString()
  @IsNotEmpty()
  memberId!: string;

  @IsString()
  @IsOptional()
  assignedAt?: string;

  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}