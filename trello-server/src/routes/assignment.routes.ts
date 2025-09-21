import AssignmentController from "@/controllers/AssignmentController";
import { Router } from "express";

const router: Router = Router({ mergeParams: true });

// Assignment Routes
router.post("/", AssignmentController.assignMember);         // POST /boards/:boardId/cards/:id/tasks/:taskId/assign
router.get("/", AssignmentController.getAssignedMembers);    // GET /boards/:boardId/cards/:id/tasks/:taskId/assign
router.delete("/:memberId", AssignmentController.removeAssignment); // DELETE /boards/:boardId/cards/:id/tasks/:taskId/assign/:memberId

export default router;