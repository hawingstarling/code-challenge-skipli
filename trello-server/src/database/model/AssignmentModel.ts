import { Collection, IEntity } from "fireorm";


export const AssignmentModelName = "assignment";

@Collection(AssignmentModelName)
export default class Assignment implements IEntity {
  id!: string;
  taskId!: string;
  memberId!: string;
  assignedAt?: string;
}