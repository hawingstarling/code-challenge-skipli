import { Collection, IEntity } from "fireorm";

export const InvitationModelName = "invitation";

export type InvitationStatus = "pending" | "accepted" | "declined" | string;

@Collection(InvitationModelName)
export default class Invitation implements IEntity {
  id!: string;
  inviteId?: string; 
  boardId!: string;
  boardOwnerId!: string;
  memberId?: string; 
  emailMember?: string;
  status!: InvitationStatus;
  
  createdAt?: Date;
  updatedAt?: Date;
}