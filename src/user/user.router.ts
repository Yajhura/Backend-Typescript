import { baseRouter } from '@shared/base.router';
import { UserController } from '@user/controller/user.controller';

export class UserRouter extends baseRouter<UserController> {
  constructor() {
    super(UserController);
  }

  routes(): void {
    this.router.get('/users', (req, res, next) => this.controller.getUsers(req, res, next));
    this.router.get('/users/:id', (req, res, next) => this.controller.getUserById(req, res, next));
    this.router.post('/users', (req, res, next) => this.controller.createUser(req, res, next));
    this.router.put('/users/:id', (req, res, next) => this.controller.updateUser(req, res, next));
    this.router.delete('/users/:id', (req, res, next) => this.controller.deleteUser(req, res, next));
  }
}
