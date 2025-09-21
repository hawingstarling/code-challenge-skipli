import { Router } from "express";

const router: Router = Router({ mergeParams: true });

// List Management Routes
router.get("/", ListController.readAll);                     // GET /boards/:boardId/lists
router.post("/", ListController.create);                     // POST /boards/:boardId/lists
router.get("/:id", ListController.readOne);                  // GET /boards/:boardId/lists/:id
router.put("/:id", ListController.update);                   // PUT /boards/:boardId/lists/:id
router.delete("/:id", ListController.delete);                // DELETE /boards/:boardId/lists/:id

export default router;
