import { baseRouter } from '@shared/base.router';
import { UserController } from '@user/controller/user.controller';

import { catchAsync } from '../utils/utils-expres-config';
import { UserMidleware } from './middleware/user.middleware';

export class UserRouter extends baseRouter<UserController, UserMidleware> {
  constructor() {
    super(UserController, UserMidleware);
  }

  routes(): void {
    this.router.get(
      '/users',
      catchAsync((req: any, res: any) => this.controller.getUsers(req, res)),
    );
    this.router.get(
      '/users/:id',
      catchAsync((req: any, res: any) => this.controller.getUserById(req, res)),
    );

    this.router.get(
      '/users-rl/:id',
      catchAsync((req: any, res: any) => this.controller.getUserWithRelation(req, res)),
    );

    this.router.post(
      '/users',
      (req: any, res: any, next: any) => this.middlewares.userValidator(req, res, next),
      catchAsync((req: any, res: any) => this.controller.createUser(req, res)),
    );
    this.router.put(
      '/users/:id',
      (req: any, res: any, next: any) => this.middlewares.userValidator(req, res, next),
      catchAsync((req: any, res: any) => this.controller.updateUser(req, res)),
    );

    this.router.delete(
      '/users/:id',
      catchAsync((req: any, res: any) => this.controller.deleteUser(req, res)),
    );
  }
}
