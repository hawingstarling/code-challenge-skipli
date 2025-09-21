import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import Controller from "./Controller";
import AuditLogModel from "@/models/AuditLogsModel";
import { BadRequestError, NotFoundError } from "@/core/ApiError";
import { SuccessCreatedResponse, SuccessResponse } from "@/core/ApiResponse";
import { ACTION, ENTITY_TYPE } from "@/models/interfaces/AuditLog";

export default class AuditLogController {
  public static readonly AuditCollectionName: string = "audit_logs";

  // POST /audit-logs - Create audit log (usually internal)
  public static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const controller: Controller = new Controller(AuditLogController.AuditCollectionName);
      let auditLog: AuditLogModel = new AuditLogModel();
      auditLog = req.body;
      
      const errors = await validate(auditLog, { forbidUnknownValues: true });
      if (errors.length > 0) {
        throw new BadRequestError("The Body Was Not Validated");
      }

      const result = await controller.create(req, res, next);
      if (result) {
        new SuccessCreatedResponse({
          id: result.id,
          action: result.action,
          entityType: result.entityType,
          entityTitle: result.entityTitle,
          userName: result.userName,
          createdAt: result.createdAt
        }).send(res);
      }
    } catch (error) {
      next(error);
    }
  }

  // GET /audit-logs - Retrieve all audit logs with filters
  // public static async readAll(req: Request, res: Response, next: NextFunction): Promise<void> {
  //   try {
  //     const controller: Controller = new Controller(AuditLogController.AuditCollectionName);
  //     const { orgId, entityType, action, userId, page = 1, limit = 50 } = req.query;
      
  //     let result;
      
  //     // Apply filters if provided
  //     if (orgId || entityType || action || userId) {
  //       const filters: any = {};
  //       if (orgId) filters.orgId = orgId;
  //       if (entityType) filters.entityType = entityType;
  //       if (action) filters.action = action;
  //       if (userId) filters.userId = userId;
        
  //       result = await controller.readWithFilters(filters);
  //     } else {
  //       result = await controller.readAll(req, res, next);
  //     }

  //     if (result && Array.isArray(result)) {
  //       // Sort by createdAt descending (newest first)
  //       const sortedLogs = result
  //         .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
  //         .slice(0, parseInt(limit as string));

  //       const auditLogs = sortedLogs.map(log => ({
  //         id: log.id,
  //         action: log.action,
  //         entityId: log.entityId,
  //         entityType: log.entityType,
  //         entityTitle: log.entityTitle,
  //         userId: log.userId,
  //         userName: log.userName,
  //         userImage: log.userImage,
  //         orgId: log.orgId,
  //         createdAt: log.createdAt
  //       }));

  //       new SuccessResponse({
  //         data: auditLogs,
  //         total: auditLogs.length,
  //         page: parseInt(page as string),
  //         limit: parseInt(limit as string)
  //       }).send(res);
  //     } else {
  //       new SuccessResponse({
  //         data: [],
  //         total: 0,
  //         page: parseInt(page as string),
  //         limit: parseInt(limit as string)
  //       }).send(res);
  //     }
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // GET /audit-logs/:id - Retrieve specific audit log
  public static async readOne(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const controller: Controller = new Controller(AuditLogController.AuditCollectionName);
      const result = await controller.readOne(req, res, next);
      
      if (result) {
        new SuccessResponse({
          id: result.id,
          action: result.action,
          entityId: result.entityId,
          entityType: result.entityType,
          entityTitle: result.entityTitle,
          userId: result.userId,
          userName: result.userName,
          userImage: result.userImage,
          orgId: result.orgId,
          createdAt: result.createdAt,
          updatedAt: result.updatedAt
        }).send(res);
      } else {
        throw new NotFoundError("Audit Log Not Found");
      }
    } catch (error) {
      next(error);
    }
  }

  // GET /audit-logs/entity/:entityId - Get logs for specific entity
  // public static async readByEntity(req: Request, res: Response, next: NextFunction): Promise<void> {
  //   try {
  //     const controller: Controller = new Controller(AuditLogController.AuditCollectionName);
  //     const { entityId } = req.params;
  //     const { limit = 20 } = req.query;
      
  //     const result = await controller.readByField("entityId", entityId);
      
  //     if (result && Array.isArray(result)) {
  //       const entityLogs = result
  //         .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
  //         .slice(0, parseInt(limit as string))
  //         .map(log => ({
  //           id: log.id,
  //           action: log.action,
  //           entityType: log.entityType,
  //           entityTitle: log.entityTitle,
  //           userName: log.userName,
  //           userImage: log.userImage,
  //           createdAt: log.createdAt
  //         }));

  //       new SuccessResponse(entityLogs).send(res);
  //     } else {
  //       new SuccessResponse([]).send(res);
  //     }
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // GET /audit-logs/user/:userId - Get logs for specific user
  // public static async readByUser(req: Request, res: Response, next: NextFunction): Promise<void> {
  //   try {
  //     const controller: Controller = new Controller(AuditLogController.AuditCollectionName);
  //     const { userId } = req.params;
  //     const { limit = 50 } = req.query;
      
  //     const result = await controller.readByField("userId", userId);
      
  //     if (result && Array.isArray(result)) {
  //       const userLogs = result
  //         .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
  //         .slice(0, parseInt(limit as string))
  //         .map(log => ({
  //           id: log.id,
  //           action: log.action,
  //           entityId: log.entityId,
  //           entityType: log.entityType,
  //           entityTitle: log.entityTitle,
  //           createdAt: log.createdAt
  //         }));

  //       new SuccessResponse(userLogs).send(res);
  //     } else {
  //       new SuccessResponse([]).send(res);
  //     }
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // Helper method to create audit log (for internal use)
  public static async createAuditLog(
    orgId: string,
    action: ACTION,
    entityId: string,
    entityType: ENTITY_TYPE,
    entityTitle: string,
    userId: string,
    userName: string,
    userImage?: string
  ): Promise<void> {
    try {
      const controller: Controller = new Controller(AuditLogController.AuditCollectionName);
      const auditLogData = {
        orgId,
        action,
        entityId,
        entityType,
        entityTitle,
        userId,
        userName,
        userImage,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      await controller.create(
        { body: auditLogData } as Request,
        {} as Response,
        {} as NextFunction
      );
    } catch (error) {
      console.error("Failed To Create Audit Log:", error);
      // Don't throw error to prevent breaking main operations
    }
  }

  // DELETE /audit-logs/:id - Delete audit log (admin only)
  public static async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const controller: Controller = new Controller(AuditLogController.AuditCollectionName);
      await controller.delete(req, res, next);
      new SuccessResponse({ message: "Audit Log Deleted Successfully" }).send(res);
    } catch (error) {
      next(error);
    }
  }

  // GET /audit-logs/stats - Get audit log statistics
  // public static async getStats(req: Request, res: Response, next: NextFunction): Promise<void> {
  //   try {
  //     const controller: Controller = new Controller(AuditLogController.AuditCollectionName);
  //     const { orgId } = req.query;
      
  //     let result;
  //     if (orgId) {
  //       result = await controller.readByField("orgId", orgId);
  //     } else {
  //       result = await controller.readAll(req, res, next);
  //     }

  //     if (result && Array.isArray(result)) {
  //       const stats = {
  //         total: result.length,
  //         byAction: result.reduce((acc: any, log) => {
  //           acc[log.action] = (acc[log.action] || 0) + 1;
  //           return acc;
  //         }, {}),
  //         byEntityType: result.reduce((acc: any, log) => {
  //           acc[log.entityType] = (acc[log.entityType] || 0) + 1;
  //           return acc;
  //         }, {}),
  //         recentActivity: result
  //           .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
  //           .slice(0, 10)
  //           .map(log => ({
  //             action: log.action,
  //             entityType: log.entityType,
  //             entityTitle: log.entityTitle,
  //             userName: log.userName,
  //             createdAt: log.createdAt
  //           }))
  //       };

  //       new SuccessResponse(stats).send(res);
  //     } else {
  //       new SuccessResponse({
  //         total: 0,
  //         byAction: {},
  //         byEntityType: {},
  //         recentActivity: []
  //       }).send(res);
  //     }
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}
