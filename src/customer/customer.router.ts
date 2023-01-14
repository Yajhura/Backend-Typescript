import { baseRouter } from '@shared/base.router';
import { catchAsync } from 'utils/utils-expres-config';

import { CustomerController } from './controller/customer.controller';

export class CustomerRouter extends baseRouter<CustomerController> {
  constructor() {
    super(CustomerController);
  }

  routes(): void {
    this.router.get('/category',catchAsync((req: any, res: any) => this.controller.getCustomers(req, res)),);
    this.router.get('/category/:id',catchAsync((req: any, res: any) => this.controller.getCustomerById(req, res)),);
    this.router.post('/category',catchAsync((req: any, res: any) => this.controller.createCustomer(req, res)),);
    this.router.put('/category/:id',catchAsync((req: any, res: any) => this.controller.updateCustomer(req, res)),);
    this.router.delete('/category/:id',catchAsync((req: any, res: any) => this.controller.deleteCustomer(req, res)),);
    
  }
}

