import { UserController } from '../controller/user.controller';
import { baseRouter } from './base.router';

export class UserRouter extends baseRouter<UserController> {
  constructor() {
    super(UserController);
  }

  routes(): void {
    this.router.get('/user', (req, res) => this.controller.getUsers(req, res));
  }
}
