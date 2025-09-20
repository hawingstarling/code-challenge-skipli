import BaseModel from "./BaseModel";
import Card from "./Card";

export default interface IList extends BaseModel {
  title: string;
  order: number;
  boardId: string;
  cards: Card[];
}