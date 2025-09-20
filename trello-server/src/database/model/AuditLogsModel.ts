import { Collection, IEntity } from "fireorm";

export const AuditLogsModelName = "audit_logs";

export enum ACTION {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export enum ENTITY_TYPE {
  BOARD = 'BOARD',
  LIST = 'LIST',
  CARD = 'CARD',
}

@Collection(AuditLogsModelName)
export default class AuditLog implements IEntity {
  id!: string;
  orgId!: string;
  action!: ACTION;
  entityId!: string;
  entityType!: ENTITY_TYPE;
  entityTitle!: string;
  userId!: string;
  userImage?: string;
  userName!: string;

  createdAt?: Date;
  updatedAt?: Date;
}