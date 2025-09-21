import BaseModel from "./BaseModel";

export enum RoleCode {
  Owner = 'owner',
  Admin = 'admin',
  Member = 'member',
  Viewer = 'viewer',
}

export type Role = {
  id: string;
  code: RoleCode;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export default interface User extends BaseModel {
  email?: string;
  fullName?: string;
  imageUsername?: string;
  verificationCode?: string;
  roles: Role[];
}
