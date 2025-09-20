import { Collection, IEntity } from "fireorm";
import Card from "./CardModel";


export const ListModelName = "list";

@Collection(ListModelName)
export default class List implements IEntity {
  id!: string;
  title!: string;
  order!: number;

  boardId!: string;

  cards: Card[] = [];

  createdAt?: Date;
  updatedAt?: Date;
}