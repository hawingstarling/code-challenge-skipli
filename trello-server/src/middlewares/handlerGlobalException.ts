import { environment } from '@/config';
import { ApiError, ErrorType, InternalError } from '@/core/ApiError';
import Logger from '@/core/Logger';
import { NextFunction, Request, Response } from 'express';

export const handlerGlobalException = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof ApiError) {
    ApiError.handle(err, res);
    if (err.type === ErrorType.INTERNAL)
      Logger.error(
        `500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
      );
  } else {
    Logger.error(
      `500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
    );
    Logger.error(err);
    if (environment === 'development') {
      res.status(500).send(err);
    }
    ApiError.handle(new InternalError(), res);
  };
}