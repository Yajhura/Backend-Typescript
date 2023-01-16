import { CustomerDTO } from '@customer/dto/customer.dto';
import { HttpResponse } from '@shared/response/http.response';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

export class CustomerMiddleware {
  constructor(private readonly httpResponse: HttpResponse = new HttpResponse()) {}

  CustomerValidator = async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;

    const valid = new CustomerDTO();
    valid.address = body.address;
    valid.dni = body.dni;
    valid.user = body.user;

    validate(valid).then((errors) => {
      if (errors.length > 0) {
        this.httpResponse.Bad_Request(res, 'Error en los datos enviados', errors);
      } else {
        next();
      }
    });
  };
}
