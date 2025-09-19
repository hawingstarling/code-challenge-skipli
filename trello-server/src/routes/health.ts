import { Router, Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  // container.resolve(RoleController).getRoles(req, res, next);
  res.send('Hello Trello')
});

export default router;