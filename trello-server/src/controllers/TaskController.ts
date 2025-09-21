import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import Controller from "./Controller";
import { NoContentResponse, SuccessCreatedResponse, SuccessResponse } from "@/core/ApiResponse";
import TaskModel from "@/models/TaskModel";
import { BadRequestError, NotFoundError } from "@/core/ApiError";

export default class TaskController {
  public static readonly TaskCollectionName: string = "task";

  // GET /boards/:boardId/cards/:id/tasks - Retrieve all tasks of a card
  public static async readAllByCard(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const controller: Controller = new Controller(TaskController.TaskCollectionName);
      const result = await controller.readAll(req, res, next);
      
      if (result && Array.isArray(result)) {
        const tasks = result.map(task => ({
          id: task.id,
          cardId: task.cardId,
          title: task.title,
          description: task.description,
          status: task.stautus
        }));
        new SuccessResponse(tasks).send(res);
      }
    } catch (error) {
      next(error);
    }
  }

  // POST /boards/:boardId/cards/:id/tasks - Create a new task within a card
  public static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const controller: Controller = new Controller(TaskController.TaskCollectionName);
      let task: TaskModel = new TaskModel();
      task = {
        ...req.body,
        cardId: req.params.id,
        ownerId: req.user?.id // Assuming user is attached to request
      };
      
      const errors = await validate(task, { forbidUnknownValues: true });
      if (errors.length > 0) {
        throw new BadRequestError("The body was not validated");
      }

      const result = await controller.create(req, res, next);
      if (result) {
        new SuccessCreatedResponse({
          id: result.id,
          cardId: result.cardId,
          ownerId: result.ownerId,
          title: result.title,
          description: result.description,
          status: result.stautus
        }).send(res);
      }
    } catch (error) {
      next(error);
    }
  }

  // GET /boards/:boardId/cards/:id/tasks/:taskId - Retrieve task details
  public static async readOne(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const controller: Controller = new Controller(TaskController.TaskCollectionName);
      const result = await controller.readOne(req, res, next);
      
      if (result) {
        new SuccessResponse({
          id: result.id,
          cardId: result.cardId,
          title: result.title,
          description: result.description,
          status: result.stautus
        }).send(res);
      } else {
        throw new NotFoundError("Task Not Found");
      }
    } catch (error) {
      next(error);
    }
  }

  // PUT /boards/:boardId/cards/:id/tasks/:taskId - Update task details
  public static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const controller: Controller = new Controller(TaskController.TaskCollectionName);
      const result = await controller.update(req, res, next);
      
      if (result) {
        new SuccessResponse({
          id: result.id,
          cardId: result.cardId
        }).send(res);
      } else {
        throw new NotFoundError("Task not found");
      }
    } catch (error) {
      next(error);
    }
  }

  // DELETE /boards/:boardId/cards/:id/tasks/:taskId - Delete task
  public static async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const controller: Controller = new Controller(TaskController.TaskCollectionName);
      await controller.delete(req, res, next);
      new NoContentResponse().send(res);
    } catch (error) {
      next(error);
    }
  }
}