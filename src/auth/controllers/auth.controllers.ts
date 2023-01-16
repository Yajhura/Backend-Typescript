import { HttpResponse } from '@shared/response/http.response';
import { UserEntity } from '@user/entities/user.entity';
import { AuthServices } from 'auth/services/auth.services';
import { Request, Response } from 'express';

export class AuthController extends AuthServices {
  constructor(private readonly httpRespose: HttpResponse = new HttpResponse()) {
    super();
  }

  async login(req: Request, res: Response) {
    const userEncode = req.user as UserEntity;
  
    const encode = await this.generateJwt(userEncode);

    if (!encode) {
      return this.httpRespose.UNAUTHORIZED(res);
    }

    res.header('Content-Type', 'application/json');
    res.cookie('accessToken', encode.accessToken, {
      //maxAge: 7h
      maxAge: 1000 * 60 * 60 * 7,
    });
    res.write(JSON.stringify(encode));
    res.end();
  }
}
