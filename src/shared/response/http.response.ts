import { Response } from 'express';

export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  NOT_FOUND = 404,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  INTERNAL_SERVER_ERROR = 500,
  BAD_REQUEST = 400,
  BAD_GATEWAY = 502,
  UNPROCESSABLE_ENTITY = 422,
}

export class HttpResponse {
  OK(res: Response, data?: any, message?: string) {
    return res.status(HttpStatusCode.OK).json({
      status: HttpStatusCode.OK,
      messageStatus: 'Success',
      message,
      data,
    });
  }

  CREATED(res: Response, data?: any, message?: string) {
    return res
      .status(HttpStatusCode.CREATED)
      .json({ status: HttpStatusCode.CREATED, messageStatus: 'Created', message, data });
  }
  NOT_FOUND(res: Response, message?: string) {
    return res
      .status(HttpStatusCode.NOT_FOUND)
      .json({ status: HttpStatusCode.NOT_FOUND, messageStatus: 'NOT FOUND', message });
  }

  UNAUTHORIZED(res: Response) {
    return res.status(HttpStatusCode.UNAUTHORIZED).json({
      status: HttpStatusCode.UNAUTHORIZED,
      messageStatus: 'UNAUTHORIZED',
      message: 'you are not authenticated or authorized to access this resource',
    });
  }

  FORBIDDEN(res: Response) {
    return res.status(HttpStatusCode.FORBIDDEN).json({
      status: HttpStatusCode.FORBIDDEN,
      messageStatus: 'FORBIDDEN',
      message: " you don't have permission to access this resource",
    });
  }

  INTERNAL_SERVER_ERROR(res: Response) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      status: HttpStatusCode.INTERNAL_SERVER_ERROR,
      messageStatus: 'INTERNAL_SERVER_ERROR',
      message: 'Internal Server Error',
    });
  }
  Bad_Request(res: Response, message: string, error?: any) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      status: HttpStatusCode.BAD_REQUEST,
      messageStatus: 'Bad Request',
      message,
      error,
    });
  }

  Mail_Error(res: Response) {
    return res.status(HttpStatusCode.BAD_GATEWAY).json({
      status: HttpStatusCode.BAD_GATEWAY,
      messageStatus: 'Bad Gateway',
      message: 'Something went wrong with Mail service',
    });
  }

  Validation_Error(res: Response, message: string, error?: any) {
    return res.status(HttpStatusCode.UNPROCESSABLE_ENTITY).json({
      status: HttpStatusCode.UNPROCESSABLE_ENTITY,
      messageStatus: 'Unprocessable Entity',
      message,
      error,
    });
  }
}
