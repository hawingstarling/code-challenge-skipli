import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import GitHubAttachment, { GitHubAttachmentType } from "./interfaces/GitHubAttachment";
import { Timestamp } from "@google-cloud/firestore";

export default class GitHubAttachmentModel implements GitHubAttachment {
  id!: string;

  @IsString()
  @IsNotEmpty()
  taskId!: string;

  @IsString()
  @IsOptional()
  repositoryId?: string;

  @IsOptional()
  type?: GitHubAttachmentType;

  @IsString()
  @IsOptional()
  number?: string;

  @IsString()
  @IsOptional()
  sha?: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  attachedAt?: string;

  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}