import { ProductDTO } from '@product/dto/product.dto';
import { HttpResponse } from '@shared/response/http.response';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

export class ProductMiddleware {
  constructor(private readonly httpResponse: HttpResponse = new HttpResponse()) {}

  ProductValidator = async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;

    const valid = new ProductDTO();
    valid.category = body.category;
    valid.productName = body.productName;
    valid.price = body.price;
    valid.description = body.description;

    validate(valid).then((errors) => {
      if (errors.length > 0) {
        this.httpResponse.Bad_Request(res, 'Error en los datos enviados', errors);
      } else {
        next();
      }
    });
  };
}
