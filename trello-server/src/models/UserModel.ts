import { Timestamp } from "@google-cloud/firestore";
import User, { Role } from "./interfaces/User";
import { IsArray, IsOptional, IsString } from "class-validator";

export default class UserModel implements User {
  id!: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  fullName?: string;

  @IsString()
  @IsOptional()
  imageUsername?: string;

  @IsArray()
  roles: Role[] = [];

  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}