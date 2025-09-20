import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";
import Board from "./interfaces/Board";
import { Timestamp } from "@google-cloud/firestore";
import ListModel from "./ListModel";

export default class BoardModel implements Board {
  id!: string;

  @IsString()
  @IsNotEmpty()
  ownerId!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  imageId?: string;

  @IsString()
  @IsOptional()
  imageThumbUrl?: string;

  @IsString()
  @IsOptional()
  imageFullUrl?: string;

  @IsString()
  @IsOptional()
  imageUsername?: string;

  @IsString()
  @IsOptional()
  imageLinkHTML?: string;

  @IsArray()
  lists: ListModel[] = [];

  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}