import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";
import List from "./interfaces/List";
import CardModel from "./CardModel";
import { Timestamp } from "@google-cloud/firestore";

export default class ListModel implements List {
  id!: string;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsNumber()
  @IsNotEmpty()
  order!: number;

  @IsString()
  @IsNotEmpty()
  boardId!: string;

  @IsArray()
  cards: CardModel[] = [];

  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}