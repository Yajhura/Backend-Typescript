import { PurchaseProductDTO } from '@purchase/dto/purchase-product.dto';
import { HttpResponse } from '@shared/response/http.response';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';


export class PurchaseProductsMiddleware {
  constructor(private readonly httpResponse: HttpResponse = new HttpResponse()) {}

  PurchaseProductsValidator = async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;

    const valid = new PurchaseProductDTO();
    valid.product = body.product;
    valid.quantityProduct = body.quantityProduct;
    valid.totalPrice = body.totalPrice;
    valid.purchase = body.purchase;

    validate(valid).then((errors) => {
      if (errors.length > 0) {
        this.httpResponse.Bad_Request(res, 'Error en los datos enviados', errors);
      } else {
        next();
      }
    });
  };
}
