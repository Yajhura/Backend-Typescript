import { HttpResponse } from '@shared/response/http.response';
import { NextFunction, Request, Response } from 'express';
import { EntityPropertyNotFoundError, QueryFailedError } from 'typeorm';

export type IError = {
  status: number;
  messageStatus: string;
  message?: string;
  errors?: any;
};
//eslint-disable-next-line
export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const httpResponse = new HttpResponse();

  if (err instanceof SyntaxError) {
    return httpResponse.Bad_Request(
      res,
      'Error en los datos enviados, verifique los datos esten correctos o el json este bien formado',
    );
  }

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

  httpResponse.INTERNAL_SERVER_ERROR(res);
};
