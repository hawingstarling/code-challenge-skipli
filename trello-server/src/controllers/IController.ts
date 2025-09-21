import { NextFunction, Request, Response } from "express";


export default interface IController<
  T
> {
  create(req: Request, res: Response, next: NextFunction): Promise<T | undefined>;
  readOne(req: Request, res: Response, next: NextFunction): Promise<T | undefined>;
  readAll(req: Request, res: Response, next: NextFunction): Promise<T[] | undefined>;
  update(req: Request, res: Response, next: NextFunction): Promise<T | undefined>;
  delete(req: Request, res: Response, next: NextFunction): Promise<boolean>;
}