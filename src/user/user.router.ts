import { baseRouter } from '@shared/base.router';
import { UserController } from '@user/controller/user.controller';

export class UserRouter extends baseRouter<UserController> {
  constructor() {
    super(UserController);
  }

  routes(): void {
    this.router.get('/user', (req, res) => this.controller.getUsers(req, res));
  }
}
