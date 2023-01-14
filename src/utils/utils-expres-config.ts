import { HttpStatusCode } from '@shared/response/http.response';
import { NextFunction, Request, Response } from 'express';
import pino from 'pino';
import * as util from 'util';

export class UtilsExpressConfig {
  NotFoundHandler(req: Request, res: Response, next: NextFunction) {
    res.status(HttpStatusCode.NOT_FOUND).json({ meesage: 'Requested resource not found or method not allowed' });
    next();
  }

  Logger() {
    return pino({ transport: { target: 'pino-pretty' } });
  }
}
export const catchAsync = (fn: any) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export const errorLogs = (err: any, req: Request, res: Response, next: NextFunction) => {
  const logger = new UtilsExpressConfig().Logger();

  logger.error(`Request Errror :
  \nERROR:\n${err.message}
  \nREQUEST HEADERS:\n${util.inspect(req.headers)}
  \nREQUEST PARAMS:\n${util.inspect(req.params)}
  \nREQUEST QUERY:\n${util.inspect(req.query)}
  \nBODY:\n${util.inspect(req.body)}
`);
  next(err);
};
