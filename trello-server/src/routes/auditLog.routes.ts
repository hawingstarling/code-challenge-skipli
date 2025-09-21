import { Router } from "express";

const router: Router = Router();

// Audit Log Routes
router.get("/", AuditLogController.readAll);                 // GET /audit-logs
router.get("/:id", AuditLogController.readOne);              // GET /audit-logs/:id
router.post("/", AuditLogController.create);                 // POST /audit-logs

export default router;
