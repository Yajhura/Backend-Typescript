
import { baseRouter } from '@shared/base.router';
import { catchAsync } from 'utils/utils-expres-config';

import { CustomerController } from './controller/customer.controller';
import { CustomerMiddleware } from './middleware/customer.middleware';

export class CustomerRouter extends baseRouter<CustomerController, CustomerMiddleware> {
  constructor() {
    super(CustomerController, CustomerMiddleware);
  }

  routes(): void {
    this.router.get(
      '/customer',
      catchAsync((req: any, res: any) => this.controller.getCustomers(req, res)),
    );
    this.router.get(
      '/customer/:id',
      catchAsync((req: any, res: any) => this.controller.getCustomerById(req, res)),
    );
    this.router.post(
      '/customer',
      (req: any, res: any, next: any) => this.middlewares.CustomerValidator(req, res, next),
      catchAsync((req: any, res: any) => this.controller.createCustomer(req, res)),
    );
    this.router.put(
      '/customer/:id',
      (req: any, res: any, next: any) => this.middlewares.CustomerValidator(req, res, next),
      catchAsync((req: any, res: any) => this.controller.updateCustomer(req, res)),
    );
    this.router.delete(
      '/customer/:id',
      catchAsync((req: any, res: any) => this.controller.deleteCustomer(req, res)),
    );
  }
}
