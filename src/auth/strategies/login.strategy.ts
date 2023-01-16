import { AuthServices } from 'auth/services/auth.services';
import { PassPortUse } from 'auth/utils/passport.use';
import { Strategy as LocalStrategy, VerifyFunction } from 'passport-local';

import { UserEntity } from '../../user/entities/user.entity';

const authServices = new AuthServices();

export class LoginStrategy {
  async validate(username: string, password: string, done: any): Promise<UserEntity> {
    const user = await authServices.validateUser(username, password);

    if (!user) {
      return done(null, false, { message: 'Incorrect username or password.' });
    }

    return done(null, user, { message: 'Logged in Successfully' });
  }

  get use() {
    return PassPortUse<LocalStrategy, Object, VerifyFunction>(
      'login',
      LocalStrategy,
      {
        usernameField: 'username',
        passwordField: 'password',
      },
      this.validate,
    );
  }
}
