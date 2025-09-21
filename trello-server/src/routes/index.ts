import { Router } from "express";

// Import all route modules
import authRoutes from "./auth.routes";
import boardRoutes from "./board.routes";
import cardRoutes from "./card.routes";
import taskRoutes from "./task.routes";
import assignmentRoutes from "./assignment.routes";
import invitationRoutes from "./invitation.routes";
import gitHubAttachmentRoutes from "./gitHubAttachment.routes";
import repositoryRoutes from "./repository.routes";
import userRoutes from "./user.routes";
import auditLogRoutes from "./auditLog.routes";
import listRoutes from "./list.routes";

const router: Router = Router();

// Authentication routes
router.use("/auth", authRoutes);

// Board management routes
router.use("/boards", boardRoutes);

// Nested routes for boards
router.use("/boards/:boardId", (req, res, next) => {
  // Middleware to validate boardId if needed
  next();
});

// Card routes (nested under boards)
router.use("/boards/:boardId/cards", cardRoutes);

// List routes (nested under boards)  
router.use("/boards/:boardId/lists", listRoutes);

// Task routes (nested under cards)
router.use("/boards/:boardId/cards/:id/tasks", taskRoutes);

// Assignment routes (nested under tasks)
router.use("/boards/:boardId/cards/:id/tasks/:taskId/assign", assignmentRoutes);

// GitHub attachment routes (nested under tasks)
router.use("/boards/:boardId/cards/:cardId/tasks/:taskId", gitHubAttachmentRoutes);

// Invitation routes (nested under boards)
router.use("/boards/:boardId", invitationRoutes);

// Repository routes
router.use("/repositories", repositoryRoutes);

// User management routes
router.use("/users", userRoutes);

// Audit log routes
router.use("/audit-logs", auditLogRoutes);

// Health check route
router.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Trello API is running",
    timestamp: new Date().toISOString()
  });
});

// API info route
router.get("/", (req, res) => {
  res.status(200).json({
    name: "Trello API",
    version: "1.0.0",
    description: "RESTful API for Trello-like application",
    endpoints: {
      auth: "/auth",
      boards: "/boards",
      cards: "/boards/:boardId/cards", 
      tasks: "/boards/:boardId/cards/:id/tasks",
      assignments: "/boards/:boardId/cards/:id/tasks/:taskId/assign",
      github: "/boards/:boardId/cards/:cardId/tasks/:taskId/github-*",
      repositories: "/repositories",
      users: "/users",
      auditLogs: "/audit-logs"
    }
  });
});

export default router;