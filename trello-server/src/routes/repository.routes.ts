import GitHubAttachmentController from "@/controllers/GitHubAttachmentController";
import { Router } from "express";

const router: Router = Router();

// Repository Routes
router.get("/:repositoryId/github-info", GitHubAttachmentController.getRepositoryInfo); // GET /repositories/:repositoryId/github-info

export default router;