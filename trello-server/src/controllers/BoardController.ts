import { NextFunction, Request, Response } from "express";
import Controller from "./Controller";
import BoardModel from "@/models/BoardModel";
import { validate } from "class-validator";
import { BadRequestError, NotFoundError } from "@/core/ApiError";
import { NoContentResponse, SuccessCreatedResponse, SuccessResponse } from "@/core/ApiResponse";


export default class BoardController {
  public static readonly BoardCollectionName: string = "board";

  // POST /boards - Create a new board
  public static async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const controller: Controller = new Controller(BoardController.BoardCollectionName);
      let board: BoardModel = new BoardModel();
      board = req.body;

      const errors = await validate(board, {
        forbidUnknownValues: true
      });
      if (errors.length > 0) {
        throw new BadRequestError(
          "The Body Was Not Validated"
        );
      }

      const result = await controller.create(req, res, next);
      if (result) {
        new SuccessCreatedResponse({
          id: result.id,
          name: result.name,
          description: result.description
        }).send(res);
      }
    } catch (error) {
      next(error);
    }
  }

  // GET /boards - Retrieve all boards
  public static async readAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const controller: Controller = new Controller(BoardController.BoardCollectionName);
      const result = await controller.readAll(req, res, next);
      
      if (result && Array.isArray(result)) {
        const boards = result.map(board => ({
          id: board.id,
          name: board.name,
          description: board.description
        }));
        new SuccessResponse(boards).send(res);
      }
    } catch (error) {
      next(error);
    }
  }

  // GET /boards/:id - Retrieve board details
  public static async readOne(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const controller: Controller = new Controller(BoardController.BoardCollectionName);
      const result = await controller.readOne(req, res, next);
      
      if (result) {
        new SuccessResponse({
          id: result.id,
          name: result.name,
          description: result.description
        }).send(res);
      } else {
        throw new NotFoundError("Board Not Found");
      }
    } catch (error) {
      next(error);
    }
  }

  // PUT /boards/:id - Update board details
  public static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const controller: Controller = new Controller(BoardController.BoardCollectionName);
      const result = await controller.update(req, res, next);
      
      if (result) {
        new SuccessResponse({
          id: result.id,
          name: result.name,
          description: result.description
        }).send(res);
      } else {
        throw new NotFoundError("Board Not Found");
      }
    } catch (error) {
      next(error);
    }
  }

  // DELETE /boards/:id - Delete board
  public static async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const controller: Controller = new Controller(BoardController.BoardCollectionName);
      await controller.delete(req, res, next);
      new NoContentResponse().send(res);
    } catch (error) {
      next(error);
    }
  }
}