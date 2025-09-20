import { Collection, IEntity } from "fireorm";
import User from "./UserModel";


export const CardModelName = "card";

@Collection(CardModelName)
export default class Card implements IEntity {
  id!: string;
  boardId!: string;
  name!: string;
  description?: string;
  listMember?: User[] = [];
  tasksCount?: number;
  status?: string;
  order!: number;

  listId!: string;

  createdAt?: Date;
  updatedAt?: Date;
}