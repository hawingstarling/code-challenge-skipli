import { Collection, IEntity } from "fireorm";
import List from "./ListModel";


export const BoardModelName = "board";

@Collection(BoardModelName)
export default class Board implements IEntity {
  id!: string;
  ownerId!: string;
  name!: string;
  description?: string;
  imageId?: string;
  imageThumbUrl?: string;
  imageFullUrl?: string;
  imageUsername?: string;
  imageLinkHTML?: string;

  lists: List[] = [];

  createdAt?: Date;
  updatedAt?: Date;
}