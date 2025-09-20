import BaseModel from "./BaseModel";
import List from "./List";

export default interface Board extends BaseModel {
  ownerId: string;
  name: string;
  description?: string;
  imageId?: string;
  imageThumbUrl?: string;
  imageFullUrl?: string;
  imageUsername?: string;
  imageLinkHTML?: string;
  lists: List[];
}