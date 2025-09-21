import TaskController from "@/controllers/TaskController";
import { Router } from "express";

const router: Router = Router({ mergeParams: true }); // To access boardId and cardId

// Task Management Routes
router.get("/", TaskController.readAllByCard);               // GET /boards/:boardId/cards/:id/tasks
router.post("/", TaskController.create);                     // POST /boards/:boardId/cards/:id/tasks
router.get("/:taskId", TaskController.readOne);              // GET /boards/:boardId/cards/:id/tasks/:taskId
router.put("/:taskId", TaskController.update);               // PUT /boards/:boardId/cards/:id/tasks/:taskId
router.delete("/:taskId", TaskController.delete);            // DELETE /boards/:boardId/cards/:id/tasks/:taskId

export default router;