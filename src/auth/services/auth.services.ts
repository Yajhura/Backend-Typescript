import { configServer } from '@config/base_config';
import { PayloadToken } from 'auth/interfaces/auth.interfaces';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { HttpResponse } from '../../shared/response/http.response';
import { UserEntity } from '../../user/entities/user.entity';
import { UserServices } from '../../user/services/user.services';

export class AuthServices extends configServer {
  constructor(
    private readonly userServices: UserServices = new UserServices(),
    private readonly jwtInstace = jwt,
    private readonly httpResponse: HttpResponse = new HttpResponse(),
  ) {
    super();
  }

  public async validateUser(username: string, password: string): Promise<UserEntity | null> {
    const userByUsername = await this.userServices.findUserWithRelationByUsername(username);
    const userByEmail = await this.userServices.findUserByEmail(username);

    if (userByUsername) {
      const isMatch = await bcrypt.compare(password, userByUsername.password);
 
      if (isMatch) {
        return userByUsername;
      }
    }

    if (userByEmail) {
      const isMatch = await bcrypt.compare(password, userByEmail.password);
      if (isMatch) {
        return userByEmail;
      }
    }

    return null;
  }

  sing(payload: jwt.JwtPayload, secret: any) {
    return this.jwtInstace.sign(payload, secret, { expiresIn: '8h' });
  }

  public async generateJwt(user: UserEntity): Promise<{ accessToken: string; user: UserEntity }> {
    const userConsult = await this.userServices.findUserWithRole(user.id, user.role);

    const payload: PayloadToken = {
      role: userConsult!.role,
      sub: userConsult!.id,
    };

    if (userConsult) {
      user.password = 'Not Permission';
    }

    return {
      accessToken: this.sing(payload, this.getEnviroment('JWT_SECRET')),
      user,
    };
  }
}
