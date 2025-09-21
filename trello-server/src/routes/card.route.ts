import CardController from "@/controllers/CardController";
import { Router } from "express";

const router: Router = Router({ mergeParams: true }); // To access boardId from parent route

// Card Management Routes
router.get("/", CardController.readAllByBoard);              // GET /boards/:boardId/cards
router.post("/", CardController.create);                     // POST /boards/:boardId/cards
router.get("/:id", CardController.readOne);                  // GET /boards/:boardId/cards/:id
router.get("/user/:user_id", CardController.readByUser);     // GET /boards/:boardId/cards/user/:user_id
router.put("/:id", CardController.update);                   // PUT /boards/:boardId/cards/:id
router.delete("/:id", CardController.delete);                // DELETE /boards/:boardId/cards/:id

export default router;
