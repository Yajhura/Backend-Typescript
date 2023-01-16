import { baseRouter } from '@shared/base.router';
import { SharedMiddleware } from '@shared/middleware/shared.middleware';
import { catchAsync } from 'utils/utils-expres-config';

import { AuthController } from './controllers/auth.controllers';

export class AuthRouter extends baseRouter<AuthController, SharedMiddleware> {
  constructor() {
    super(AuthController, SharedMiddleware);
  }

  routes(): void {
    this.router.post('/login', this.middlewares.passAuth('login'), (req, res) =>
      catchAsync(this.controller.login(req, res)),
    );
  }
}
