import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import Controller from "./Controller";
import { NoContentResponse, SuccessCreatedResponse, SuccessResponse } from "@/core/ApiResponse";
import CardModel from "@/models/CardModel";
import { BadRequestError, NotFoundError } from "@/core/ApiError";

export default class CardController {
  public static readonly CardCollectionName: string = "card";

  // GET /boards/:boardId/cards - Retrieve all cards
  public static async readAllByBoard(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const controller: Controller = new Controller(CardController.CardCollectionName);
      const result = await controller.readAll(req, res, next);
      
      if (result && Array.isArray(result)) {
        const cards = result.map(card => ({
          id: card.id,
          name: card.name,
          description: card.description
        }));
        new SuccessResponse(cards).send(res);
      }
    } catch (error) {
      next(error);
    }
  }

  // POST /boards/:boardId/cards - Create a new card
  public static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const controller: Controller = new Controller(CardController.CardCollectionName);
      let card: CardModel = new CardModel();
      card = { ...req.body, boardId: req.params.boardId };
      
      const errors = await validate(card, { forbidUnknownValues: true });
      if (errors.length > 0) {
        throw new BadRequestError("The Body Was Not Validated");
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

  // GET /boards/:boardId/cards/:id - Retrieve card details
  public static async readOne(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const controller: Controller = new Controller(CardController.CardCollectionName);
      const result = await controller.readOne(req, res, next);
      
      if (result) {
        new SuccessResponse({
          id: result.id,
          name: result.name,
          description: result.description
        }).send(res);
      } else {
        throw new NotFoundError("Card Not Found");
      }
    } catch (error) {
      next(error);
    }
  }

  // GET /boards/:boardId/cards/user/:user_id - Retrieve cards by user
  public static async readByUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const controller: Controller = new Controller(CardController.CardCollectionName);
      // This would need custom implementation to filter by user
      const result = await controller.readAll(req, res, next);
      
      if (result && Array.isArray(result)) {
        const cards = result.map(card => ({
          id: card.id,
          name: card.name,
          description: card.description,
          tasks_count: card.tasksCount || "0",
          list_member: card.listMember || [],
          createdAt: card.createdAt
        }));
        new SuccessResponse(cards).send(res);
      }
    } catch (error) {
      next(error);
    }
  }

  // PUT /boards/:boardId/cards/:id - Update card details
  public static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const controller: Controller = new Controller(CardController.CardCollectionName);
      const result = await controller.update(req, res, next);
      
      if (result) {
        new SuccessResponse({
          id: result.id,
          name: result.name,
          description: result.description
        }).send(res);
      } else {
        throw new NotFoundError("Card Not Found");
      }
    } catch (error) {
      next(error);
    }
  }

  // DELETE /boards/:boardId/cards/:id - Delete card
  public static async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const controller: Controller = new Controller(CardController.CardCollectionName);
      await controller.delete(req, res, next);
      new NoContentResponse().send(res);
    } catch (error) {
      next(error);
    }
  }
}