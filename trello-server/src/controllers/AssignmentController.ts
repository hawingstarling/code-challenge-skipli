import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import Controller from "./Controller";
import AssignmentModel from "@/models/AssignmentModel";
import { BadRequestError } from "@/core/ApiError";
import { NoContentResponse, SuccessCreatedResponse, SuccessResponse } from "@/core/ApiResponse";

export default class AssignmentController {
  public static readonly AssignmentCollectionName: string = "assignment";

  // POST /boards/:boardId/cards/:id/tasks/:taskId/assign - Assign member to task
  public static async assignMember(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const controller: Controller = new Controller(AssignmentController.AssignmentCollectionName);
      let assignment: AssignmentModel = new AssignmentModel();
      assignment = {
        ...req.body,
        taskId: req.params.taskId,
        memberId: req.body.memberId,
        assignedAt: new Date().toISOString()
      };
      
      const errors = await validate(assignment, { forbidUnknownValues: true });
      if (errors.length > 0) {
        throw new BadRequestError("The Body Was Not Validated");
      }

      const result = await controller.create(req, res, next);
      if (result) {
        new SuccessCreatedResponse({
          taskId: result.taskId,
          memberId: result.memberId
        }).send(res);
      }
    } catch (error) {
      next(error);
    }
  }

  // GET /boards/:boardId/cards/:id/tasks/:taskId/assign - Get assigned members
  public static async getAssignedMembers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const controller: Controller = new Controller(AssignmentController.AssignmentCollectionName);
      const result = await controller.readAll(req, res, next);
      
      if (result && Array.isArray(result)) {
        const assignments = result.map(assignment => ({
          taskId: assignment.taskId,
          memberId: assignment.memberId
        }));
        new SuccessResponse(assignments).send(res);
      }
    } catch (error) {
      next(error);
    }
  }

  // DELETE /boards/:boardId/cards/:id/tasks/:taskId/assign/:memberId - Remove assignment
  public static async removeAssignment(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const controller: Controller = new Controller(AssignmentController.AssignmentCollectionName);
      await controller.delete(req, res, next);
      new NoContentResponse().send(res);
    } catch (error) {
      next(error);
    }
  }
}
