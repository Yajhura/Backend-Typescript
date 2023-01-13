import { baseRouter } from '@shared/base.router';

import { CustomerController } from './controller/customer.controller';

export class CategoryRouter extends baseRouter<CustomerController> {
  constructor() {
    super(CustomerController);
  }

  routes(): void {
    this.router.get('/customer', (req, res, next) => this.controller.getCustomers(req, res, next));
    this.router.get('/customer/:id', (req, res, next) => this.controller.getCustomerById(req, res, next));
    this.router.post('/customer', (req, res, next) => this.controller.createCustomer(req, res, next));
    this.router.put('/customer/:id', (req, res, next) => this.controller.updateCustomer(req, res, next));
    this.router.delete('/customer/:id', (req, res, next) => this.controller.deleteCustomer(req, res, next));
  }
}
