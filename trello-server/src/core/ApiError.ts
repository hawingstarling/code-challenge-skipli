import { Response } from 'express';
import { environment } from "src/config";
import { 
  ErrorApi, 
  NotFoundResponse, 
  ForbiddenResponse, 
  BadRequestResponse, 
  UnauthorizedResponse,
  InternalErrorResponse, 
  AccessTokenErrorResponse, 
} from "./ApiResponse";

export enum ErrorType {
  BAD_TOKEN = 'BadTokenError',
  TOKEN_EXPIRED = 'TokenExpiredError',
  UNAUTHORIZED = 'AuthFailureError',
  ACCESS_TOKEN = 'AccessTokenError',
  INTERNAL = 'InternalError',
  NOT_FOUND = 'NotFoundError',
  BAD_REQUEST = 'BadRequestError',
  FORBIDDEN = 'ForbiddenError',
  CONFLICT = 'ConflictError',
}

export abstract class ApiError extends Error {
  constructor(public type: ErrorType, public message: string) {
    super(type);
  }

  public static handle(err: ApiError, res: Response): Response {
    const error: ErrorApi = { key: err.type, value: err.message };
    switch (err.type) {
      case ErrorType.BAD_TOKEN:
      case ErrorType.TOKEN_EXPIRED:
      case ErrorType.UNAUTHORIZED:
        return new UnauthorizedResponse([error]).send(res);
      case ErrorType.ACCESS_TOKEN:
        return new AccessTokenErrorResponse([error]).send(res);
      case ErrorType.INTERNAL:
        return new InternalErrorResponse([error]).send(res);
      case ErrorType.NOT_FOUND:
        return new NotFoundResponse([error]).send(res);
      case ErrorType.BAD_REQUEST:
        return new BadRequestResponse([error]).send(res);
      case ErrorType.FORBIDDEN:
        return new ForbiddenResponse([error]).send(res);
      default: {
        // Do not send failure message in production as it may send sensitive data
        if (environment === 'production')
          error.value = 'Something wrong happened.';
        return new InternalErrorResponse([error]).send(res);
      }
    }
  }
}

/**
 * Specific Errors
 */
export class BadRequestError extends ApiError {
  constructor(message = 'Bad Request') {
    super(ErrorType.BAD_REQUEST, message);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message = 'Unauthorized') {
    super(ErrorType.UNAUTHORIZED, message);
  }
}

export class ForbiddenError extends ApiError {
  constructor(message = 'Permission denied') {
    super(ErrorType.FORBIDDEN, message);
  }
}

export class NotFoundError extends ApiError {
  constructor(message = 'Not Found') {
    super(ErrorType.NOT_FOUND, message);
  }
}

export class InternalError extends ApiError {
  constructor(message = 'Internal Error') {
    super(ErrorType.INTERNAL, message);
  }
}

export class ConflictError extends ApiError {
  constructor(message = 'Conflict Error') {
    super(ErrorType.CONFLICT, message);
  }
}