import InvitationController from "@/controllers/InvitationController";
import { Router } from "express";

const router: Router = Router({ mergeParams: true });

// Invitation Routes
router.post("/invite", InvitationController.inviteToBoard);   // POST /boards/:boardId/invite
router.post("/cards/:id/invite/accept", InvitationController.acceptInvitation); // POST /boards/:boardId/cards/:id/invite/accept

export default router;