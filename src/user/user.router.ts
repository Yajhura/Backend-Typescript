import { baseRouter } from '@shared/base.router';
import { UserController } from '@user/controller/user.controller';

import { catchAsync } from '../utils/utils-expres-config';

export class UserRouter extends baseRouter<UserController> {
  constructor() {
    super(UserController);
  }

  routes(): void {
    this.router.get(
      '/users',
      catchAsync((req: any, res: any, next: any) => this.controller.getUsers(req, res, next)),
    );
    this.router.get(
      '/users/:id',
      catchAsync((req: any, res: any) => this.controller.getUserById(req, res)),
    );

    this.router.post(
      '/users',
      catchAsync((req: any, res: any, next: any) => this.controller.createUser(req, res, next)),
    );
    this.router.put(
      '/users/:id',
      catchAsync((req: any, res: any) => this.controller.updateUser(req, res)),
    );

    this.router.delete(
      '/users/:id',
      catchAsync((req: any, res: any) => this.controller.deleteUser(req, res)),
    );
  }
}
