import BaseModel from "./BaseModel";

export enum ACTION {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export enum ENTITY_TYPE {
  BOARD = 'BOARD',
  LIST = 'LIST',
  CARD = 'CARD',
  TASK = 'TASK',
  USER = 'USER',
}

export default interface IAuditLog extends BaseModel {
  orgId: string;
  action: ACTION;
  entityId: string;
  entityType: ENTITY_TYPE;
  entityTitle: string;
  userId: string;
  userImage?: string;
  userName: string;
}