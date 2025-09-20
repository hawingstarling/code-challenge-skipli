import { Collection, IEntity } from "fireorm";

export const UserModelName = "user";

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

@Collection(UserModelName)
export default class User implements IEntity {
  id!: string;
  email?: string;
  fullName?: string;
  imageUsername?: string;
  roles: Role[] = [];

  createdAt?: Date;
  updatedAt?: Date;
}