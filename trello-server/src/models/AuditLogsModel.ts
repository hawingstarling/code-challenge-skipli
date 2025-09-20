import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import AuditLog, { ACTION, ENTITY_TYPE } from "./interfaces/AuditLog";
import { Timestamp } from "@google-cloud/firestore";

export default class AuditLogModel implements AuditLog {
  id!: string;

  @IsString()
  @IsNotEmpty()
  orgId!: string;

  @IsEnum(ACTION)
  @IsNotEmpty()
  action!: ACTION;

  @IsString()
  @IsNotEmpty()
  entityId!: string;

  @IsEnum(ENTITY_TYPE)
  @IsNotEmpty()
  entityType!: ENTITY_TYPE;

  @IsString()
  @IsNotEmpty()
  entityTitle!: string;

  @IsString()
  @IsNotEmpty()
  userId!: string;

  @IsString()
  @IsOptional()
  userImage?: string;

  @IsString()
  @IsNotEmpty()
  userName!: string;

  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}