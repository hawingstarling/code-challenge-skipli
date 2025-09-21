import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import Controller from "./Controller";
import ListModel from "@/models/ListModel";
import { BadRequestError, NotFoundError } from "@/core/ApiError";
import { NoContentResponse, SuccessCreatedResponse, SuccessResponse } from "@/core/ApiResponse";

export default class ListController {
  public static readonly ListCollectionName: string = "list";

  // POST /boards/:boardId/lists - Create a new list
  public static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const controller: Controller = new Controller(ListController.ListCollectionName);
      let list: ListModel = new ListModel();
      list = { ...req.body, boardId: req.params.boardId };
      
      const errors = await validate(list, { forbidUnknownValues: true });
      if (errors.length > 0) {
        throw new BadRequestError("The Body Was Not Validated");
      }

      const result = await controller.create(req, res, next);
      if (result) {
        new SuccessCreatedResponse({
          id: result.id,
          title: result.title,
          order: result.order,
          boardId: result.boardId,
          isArchived: result.isArchived || false
        }).send(res);
      }
    } catch (error) {
      next(error);
    }
  }

  // // GET /boards/:boardId/lists - Retrieve all lists for a board
  // public static async readAllByBoard(req: Request, res: Response, next: NextFunction): Promise<void> {
  //   try {
  //     const controller: Controller = new Controller(ListController.ListCollectionName);
  //     // Filter by boardId
  //     const result = await controller.readByField("boardId", req.params.boardId);
      
  //     if (result && Array.isArray(result)) {
  //       const lists = result
  //         .filter(list => !list.isArchived) // Only show non-archived lists
  //         .sort((a, b) => (a.order || 0) - (b.order || 0)) // Sort by order
  //         .map(list => ({
  //           id: list.id,
  //           title: list.title,
  //           order: list.order,
  //           boardId: list.boardId,
  //           cardCount: list.cardCount || 0,
  //           createdAt: list.createdAt,
  //           updatedAt: list.updatedAt
  //         }));
  //       new SuccessResponse(lists).send(res);
  //     } else {
  //       new SuccessResponse([]).send(res);
  //     }
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // GET /boards/:boardId/lists/:id - Retrieve list details
  public static async readOne(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const controller: Controller = new Controller(ListController.ListCollectionName);
      const result = await controller.readOne(req, res, next);
      
      if (result) {
        new SuccessResponse({
          id: result.id,
          title: result.title,
          order: result.order,
          boardId: result.boardId,
          cardCount: result.cardCount || 0,
          isArchived: result.isArchived || false,
          createdAt: result.createdAt,
          updatedAt: result.updatedAt
        }).send(res);
      } else {
        throw new NotFoundError("List Not Found");
      }
    } catch (error) {
      next(error);
    }
  }

  // PUT /boards/:boardId/lists/:id - Update list details
  public static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const controller: Controller = new Controller(ListController.ListCollectionName);
      const result = await controller.update(req, res, next);
      
      if (result) {
        new SuccessResponse({
          id: result.id,
          title: result.title,
          order: result.order,
          boardId: result.boardId,
          cardCount: result.cardCount || 0,
          isArchived: result.isArchived || false,
          updatedAt: result.updatedAt
        }).send(res);
      } else {
        throw new NotFoundError("List Not Found");
      }
    } catch (error) {
      next(error);
    }
  }

  // DELETE /boards/:boardId/lists/:id - Delete/Archive list
  public static async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const controller: Controller = new Controller(ListController.ListCollectionName);
      // Soft delete by marking as archived
      const archiveData = { isArchived: true, updatedAt: new Date() };
      req.body = archiveData;
      
      await controller.update(req, res, next);
      new NoContentResponse().send(res);
    } catch (error) {
      next(error);
    }
  }

  // PUT /boards/:boardId/lists/:id/restore - Restore archived list
  public static async restore(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const controller: Controller = new Controller(ListController.ListCollectionName);
      const restoreData = { isArchived: false, updatedAt: new Date() };
      req.body = restoreData;
      
      const result = await controller.update(req, res, next);
      if (result) {
        new SuccessResponse({
          id: result.id,
          title: result.title,
          isArchived: result.isArchived,
          message: "List Restored Successfully"
        }).send(res);
      }
    } catch (error) {
      next(error);
    }
  }

  // GET /boards/:boardId/lists/archived - Get archived lists
  // public static async getArchived(req: Request, res: Response, next: NextFunction): Promise<void> {
  //   try {
  //     const controller: Controller = new Controller(ListController.ListCollectionName);
  //     const result = await controller.readWithFilters({ 
  //       boardId: req.params.boardId, 
  //       isArchived: true 
  //     });
      
  //     if (result && Array.isArray(result)) {
  //       const archivedLists = result.map(list => ({
  //         id: list.id,
  //         title: list.title,
  //         order: list.order,
  //         boardId: list.boardId,
  //         archivedAt: list.updatedAt
  //       }));
  //       new SuccessResponse(archivedLists).send(res);
  //     } else {
  //       new SuccessResponse([]).send(res);
  //     }
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}