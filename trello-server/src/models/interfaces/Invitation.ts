import BaseModel from "./BaseModel";

export type InvitationStatus = "pending" | "accepted" | "declined" | string;

export default interface Invitation extends BaseModel {
  inviteId?: string;
  boardId: string;
  boardOwnerId: string;
  memberId?: string;
  emailMember?: string;
  status: InvitationStatus;
}