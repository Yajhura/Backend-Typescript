import { HttpResponse } from '@shared/response/http.response';
import { NextFunction, Request, Response } from 'express';
import { EntityPropertyNotFoundError, QueryFailedError } from 'typeorm';

export type IError = {
  status: number;
  messageStatus: string;
  message?: string;
  errors?: any;
};

export const globalErrorHandler = (err: IError, req: Request, res: Response, next: NextFunction) => {
  const httpResponse = new HttpResponse();
  console.log('llega al global error handler');

  if (err instanceof EntityPropertyNotFoundError) {
    return httpResponse.NOT_FOUND(res, err.message || 'No existe propiedad en la entidad');
  }

  if (err instanceof QueryFailedError) {
    const errorQuery = {
      message: err.driverError.sqlMessage,
      code: err.driverError.code,
    } as any;

    return httpResponse.Validation_Error(res, errorQuery);
  }

  if (err instanceof Error) {
    console.log(err);
  }

  httpResponse.INTERNAL_SERVER_ERROR(res);
};
