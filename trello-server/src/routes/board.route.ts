import BoardController from "@/controllers/BoardController";
import { Router } from "express";

const router: Router = Router();

// Board Management Routes
router.post("/", BoardController.create);                    // POST /boards
router.get("/", BoardController.readAll);                    // GET /boards  
router.get("/:id", BoardController.readOne);                 // GET /boards/:id
router.put("/:id", BoardController.update);                  // PUT /boards/:id
router.delete("/:id", BoardController.delete);               // DELETE /boards/:id

export default router;