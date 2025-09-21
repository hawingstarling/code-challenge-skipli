import { Router } from "express";

const router: Router = Router();

// Authentication Routes
router.post("/auth/signup", AuthController.signup);               
router.post("/auth/signin", AuthController.signin);
export default router;