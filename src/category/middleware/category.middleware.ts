import { CategoryDTO } from '@category/dto/category.dto';
import { HttpResponse } from '@shared/response/http.response';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

export class CategoryMiddleware {
  constructor(private readonly httpResponse: HttpResponse = new HttpResponse()) {}

  CategoryValidator = async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;

    const valid = new CategoryDTO();
    valid.categoryName = body.categoryName;
    valid.colorBadge = body.colorBadge;

    validate(valid).then((errors) => {
      if (errors.length > 0) {
        this.httpResponse.Bad_Request(res, 'Error en los datos enviados', errors);
      } else {
        next();
      }
    });
  };
}
