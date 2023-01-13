import { HttpStatusCode } from '@shared/response/http.response';
import { NextFunction, Request, Response } from 'express';
import pino from 'pino';

export class UtilsExpressConfig {
  NotFoundHandler(req: Request, res: Response, next: NextFunction) {
    res.status(HttpStatusCode.NOT_FOUND).json({ meesage: 'Requested resource not found or method not allowed' });
    next();
  }

  Logger() {
    return pino({ transport: { target: 'pino-pretty' } });
  }
}
