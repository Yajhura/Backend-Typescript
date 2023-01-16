import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

import { HttpResponse } from '../../shared/response/http.response';
import { UserDTO } from '../dto/user.dto';

export class UserMidleware {
  constructor(private readonly httpResponse: HttpResponse = new HttpResponse()) {}

  userValidator = async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;

    const valid = new UserDTO();
    valid.username = body.username;
    valid.city = body.city;
    valid.email = body.email;
    valid.lastname = body.lastname;
    valid.name = body.name;
    valid.password = body.password;
    valid.province = body.province;
    valid.role = body.role;

    validate(valid).then((errors) => {
      if (errors.length > 0) {
        this.httpResponse.Bad_Request(res, 'Error en los datos enviados', errors);
      } else {
        next();
      }
    });
  };
}
