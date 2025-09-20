import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import Invitation, { InvitationStatus } from "./interfaces/Invitation";
import { Timestamp } from "@google-cloud/firestore";

export default class InvitationModel implements Invitation {
  id!: string;

  @IsString()
  @IsOptional()
  inviteId?: string;

  @IsString()
  @IsNotEmpty()
  boardId!: string;

  @IsString()
  @IsNotEmpty()
  boardOwnerId!: string;

  @IsString()
  @IsOptional()
  memberId?: string;

  @IsString()
  @IsOptional()
  emailMember?: string;

  @IsNotEmpty()
  status!: InvitationStatus;

  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}