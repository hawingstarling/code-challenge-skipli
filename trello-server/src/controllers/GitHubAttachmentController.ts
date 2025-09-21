import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import Controller from "./Controller";
import GitHubAttachmentModel from "@/models/GitHubAttachmentModel";
import { BadRequestError } from "@/core/ApiError";
import { NoContentResponse, SuccessCreatedResponse, SuccessResponse } from "@/core/ApiResponse";

export default class GitHubAttachmentController {
  public static readonly GitHubAttachmentCollectionName: string = "gitHubattachment";

  // GET /repositories/:repositoryId/github-info - Get GitHub repository info
  // public static async getRepositoryInfo(req: Request, res: Response, next: NextFunction): Promise<void> {
  //   try {
  //     // This would integrate with GitHub API
  //     const mockData = {
  //       repositoryId: req.params.repositoryId,
  //       branches: [
  //         { name: "main", lastCommitSha: "abc123" },
  //         { name: "develop", lastCommitSha: "def456" }
  //       ],
  //       pulls: [
  //         { title: "Feature: Add new functionality", pullNumber: "1" }
  //       ],
  //       issues: [
  //         { title: "Bug: Fix login issue", issueNumber: "1" }
  //       ],
  //       commits: [
  //         { sha: "abc123", message: "Initial commit" }
  //       ]
  //     };
      
  //     new SuccessResponse(mockData).send(res);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // POST /boards/:boardId/cards/:cardId/tasks/:taskId/github-attach - Attach GitHub item
  public static async attachGitHubItem(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const controller: Controller = new Controller(GitHubAttachmentController.GitHubAttachmentCollectionName);
      let attachment: GitHubAttachmentModel = new GitHubAttachmentModel();
      attachment = {
        ...req.body,
        taskId: req.params.taskId,
        attachedAt: new Date().toISOString()
      };
      
      const errors = await validate(attachment, { forbidUnknownValues: true });
      if (errors.length > 0) {
        throw new BadRequestError("The Body Was Not Validated");
      }

      const result = await controller.create(req, res, next);
      if (result) {
        new SuccessCreatedResponse({
          taskId: result.taskId,
          attachmentId: result.id,
          type: result.type,
          number: result.number
        }).send(res);
      }
    } catch (error) {
      next(error);
    }
  }

  // GET /boards/:boardId/cards/:cardId/tasks/:taskId/github-attachments - Get attachments
  public static async getAttachments(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const controller: Controller = new Controller(GitHubAttachmentController.GitHubAttachmentCollectionName);
      const result = await controller.readAll(req, res, next);
      
      if (result && Array.isArray(result)) {
        const attachments = result.map(attachment => ({
          attachmentId: attachment.id,
          type: attachment.type,
          number: attachment.number,
          sha: attachment.sha
        }));
        new SuccessResponse(attachments).send(res);
      }
    } catch (error) {
      next(error);
    }
  }

  // DELETE /boards/:boardId/cards/:cardId/tasks/:taskId/github-attachments/:attachmentId - Remove attachment
  public static async removeAttachment(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const controller: Controller = new Controller(GitHubAttachmentController.GitHubAttachmentCollectionName);
      await controller.delete(req, res, next);
      new NoContentResponse().send(res);
    } catch (error) {
      next(error);
    }
  }
}