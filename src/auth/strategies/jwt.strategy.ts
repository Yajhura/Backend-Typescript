import { ExtractJwt, Strategy as JwtStr, StrategyOptions } from 'passport-jwt';

import { PayloadToken } from '../interfaces/auth.interfaces';
import { AuthServices } from '../services/auth.services';
import { PassPortUse } from '../utils/passport.use';

export class JWTStrategy extends AuthServices {
  constructor() {
    super();
  }

  async validate(payload: PayloadToken, done: any) {
    return done(null, payload);
  }

  get use() {
    return PassPortUse<JwtStr, StrategyOptions, (payload: PayloadToken, done: any) => Promise<PayloadToken>>(
      'jwt',
      JwtStr,
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: this.getEnviroment('JWT_SECRET'),
      },
      this.validate,
    );
  }
}
