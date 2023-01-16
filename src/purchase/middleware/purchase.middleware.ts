import { PurchaseDTO } from '@purchase/dto/purchase.dto';
import { HttpResponse } from '@shared/response/http.response';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

export class PurchaseMiddleware {
  constructor(private readonly httpResponse: HttpResponse = new HttpResponse()) {}

  PurchaseValidator = async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;

    const valid = new PurchaseDTO();
    valid.paymentMethod = body.paymentMethod;
    valid.status = body.status;
    valid.customer = body.customer;

    validate(valid).then((errors) => {
      if (errors.length > 0) {
        this.httpResponse.Bad_Request(res, 'Error en los datos enviados', errors);
      } else {
        next();
      }
    });
  };
}
