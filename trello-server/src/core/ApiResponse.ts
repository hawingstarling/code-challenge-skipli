import { Response } from 'express';

// Helper code for the API consumer to understand the error and handle is accordingly

export enum ResponseStatus {
  SUCCESS = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_ERROR = 500,
}

export interface ErrorApi {
  key: string;
  value: string;
}

export abstract class ApiResponse {
  constructor(
    protected status: ResponseStatus,
    protected errors?: ErrorApi[],
  ) {}

  protected prepare<T extends ApiResponse>(
    res: Response,
    response: T,
    headers: Record<string, string> = {},
  ): Response {
    for (const [key, value] of Object.entries(headers)) {
      res.append(key, value);
    }
    return res.status(this.status).json(ApiResponse.sanitize(response));
  }

  public send(res: Response, headers: Record<string, string> = {}): Response {
    return this.prepare<ApiResponse>(res, this, headers);
  }

  private static sanitize<T extends ApiResponse>(response: T): T {
    const clone: T = {} as T;
    Object.assign(clone, response);
    for (const i in clone) if (typeof clone[i] === 'undefined') delete clone[i];
    return clone;
  }
}

/**
 * Success Responses
 */
export class SuccessResponse<T> extends ApiResponse {
  constructor(private data: T) {
    super(ResponseStatus.SUCCESS);
  }

  send(res: Response, headers: Record<string, string> = {}): Response {
    return super.prepare<SuccessResponse<T>>(res, this, headers);
  }
}

export class SuccessCreatedResponse<T> extends ApiResponse {
  constructor(private data: T) {
    super(ResponseStatus.CREATED);
  }

  send(res: Response, headers: Record<string, string> = {}): Response {
    return super.prepare<SuccessCreatedResponse<T>>(res, this, headers);
  }
}

export class NoContentResponse extends ApiResponse {
  constructor() {
    super(ResponseStatus.NO_CONTENT);
  }

  send(res: Response, headers: Record<string, string> = {}): Response {
    return res.status(this.status).send();
  }
}

/**
 * Error Responses
 */
export class BadRequestResponse extends ApiResponse {
  constructor(errors?: ErrorApi[]) {
    super(ResponseStatus.BAD_REQUEST, errors);
  }
}

export class UnauthorizedResponse extends ApiResponse {
  constructor(errors?: ErrorApi[]) {
    super(ResponseStatus.UNAUTHORIZED, errors);
  }
}

export class ForbiddenResponse extends ApiResponse {
  constructor(errors?: ErrorApi[]) {
    super(ResponseStatus.FORBIDDEN, errors);
  }
}

export class NotFoundResponse extends ApiResponse {
  constructor(errors?: ErrorApi[]) {
    super(ResponseStatus.NOT_FOUND, errors);
  }
}

export class InternalErrorResponse extends ApiResponse {
  constructor(errors?: ErrorApi[]) {
    super(ResponseStatus.INTERNAL_ERROR, errors);
  }
}

/**
 * Access Token Error (Special Case)
 */
export class AccessTokenErrorResponse extends ApiResponse {
  private instruction = 'refresh_token';

  constructor(errors?: ErrorApi[]) {
    super(ResponseStatus.UNAUTHORIZED, errors);
  }

  send(res: Response, headers: Record<string, string> = {}): Response {
    headers.instruction = this.instruction;
    return super.prepare<AccessTokenErrorResponse>(res, this, headers);
  }
}