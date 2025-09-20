import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import Card from "./interfaces/Card";
import { Timestamp } from "@google-cloud/firestore";
import UserModel from "./UserModel";

export default class CardModel implements Card {
  id!: string;

  @IsString()
  @IsNotEmpty()
  boardId!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsOptional()
  listMember?: UserModel[] = [];

  @IsNumber()
  @IsOptional()
  tasksCount?: number;

  @IsString()
  @IsOptional()
  status?: string;

  @IsNumber()
  @IsNotEmpty()
  order!: number;

  @IsString()
  @IsNotEmpty()
  listId!: string;

  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}