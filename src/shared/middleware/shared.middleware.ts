import { HttpResponse } from '@shared/response/http.response';
import { UserEntity } from '@user/entities/user.entity';
import { NextFunction, Request, Response } from 'express';
import passport from 'passport';

export class SharedMiddleware {
  constructor(public httpResponse: HttpResponse = new HttpResponse()) {}

  passAuth(type: string) {
    return passport.authenticate(type, { session: false });
  }

  checkAdminRole(req: Request, res: Response, next: NextFunction) {
    const user = req.user as UserEntity;

    if (user.role !== 'admin') {
      return this.httpResponse.UNAUTHORIZED(res);
    }

    return next();
  }
}
