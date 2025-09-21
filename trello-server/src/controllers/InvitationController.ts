import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import Controller from "./Controller";
import InvitationModel from "@/models/InvitationModel";
import { BadRequestError } from "@/core/ApiError";
import { SuccessResponse } from "@/core/ApiResponse";

export default class InvitationController {
  public static readonly InvitationCollectionName: string = "invitation";

  // POST /boards/:boardId/invite - Invite people to a board
  public static async inviteToBoard(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const controller: Controller = new Controller(InvitationController.InvitationCollectionName);
      let invitation: InvitationModel = new InvitationModel();
      invitation = {
        ...req.body,
        boardId: req.params.boardId,
        status: "pending"
      };
      
      const errors = await validate(invitation, { forbidUnknownValues: true });
      if (errors.length > 0) {
        throw new BadRequestError("The Body Was Not Validated");
      }

      await controller.create(req, res, next);
      new SuccessResponse({ success: true }).send(res);
    } catch (error) {
      next(error);
    }
  }

  // POST /boards/:boardId/cards/:id/invite/accept - Accept card invitation
  public static async acceptInvitation(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const controller: Controller = new Controller(InvitationController.InvitationCollectionName);
      const result = await controller.update(req, res, next);
      
      if (result) {
        new SuccessResponse({ success: true }).send(res);
      } else {
        throw new BadRequestError("Failed To Accept Invitation");
      }
    } catch (error) {
      next(error);
    }
  }
}
