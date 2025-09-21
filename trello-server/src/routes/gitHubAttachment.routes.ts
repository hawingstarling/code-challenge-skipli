import GitHubAttachmentController from "@/controllers/GitHubAttachmentController";
import { Router } from "express";

const router: Router = Router({ mergeParams: true });

// GitHub Attachment Routes
router.post("/github-attach", GitHubAttachmentController.attachGitHubItem); // POST /boards/:boardId/cards/:cardId/tasks/:taskId/github-attach
router.get("/github-attachments", GitHubAttachmentController.getAttachments); // GET /boards/:boardId/cards/:cardId/tasks/:taskId/github-attachments  
router.delete("/github-attachments/:attachmentId", GitHubAttachmentController.removeAttachment); // DELETE /boards/:boardId/cards/:cardId/tasks/:taskId/github-attachments/:attachmentId

export default router;