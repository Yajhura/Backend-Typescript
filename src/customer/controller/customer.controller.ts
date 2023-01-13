import { CustomerServices } from '@customer/services/customer.services';
import { NextFunction, Request, Response } from 'express';

import { HttpResponse } from './../../shared/response/http.response';

export class CustomerController {
  constructor(
    private readonly customerServices: CustomerServices = new CustomerServices(),
    private readonly httpResponse: HttpResponse = new HttpResponse(),
  ) {}

  async getCustomers(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.customerServices.findAll();

      if (data.length === 0) {
        return this.httpResponse.NOT_FOUND(res, 'No existe datos');
      }

      return this.httpResponse.OK(res, data);
    } catch (error) {
      next(error);
    }
  }

  async getCustomerById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const data = await this.customerServices.findCustomerById(id);

      if (!data) {
        return this.httpResponse.NOT_FOUND(res, 'No existe Customer');
      }

      return this.httpResponse.OK(res, data);
    } catch (error) {
      next(error);
    }
  }

  async createCustomer(req: Request, res: Response, next: NextFunction) {
    const { body } = req;
    try {
      const data = await this.customerServices.createCustomer(body);

      return this.httpResponse.CREATED(res, data, 'Customer creado');
    } catch (error) {
      next(error);
    }
  }

  async updateCustomer(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { body } = req;
    try {
      const data = await this.customerServices.updateCustomer(id, body);
      if (!data) {
        return this.httpResponse.NOT_FOUND(res, 'No existe Customer');
      }
      return this.httpResponse.OK(res, data, 'Customer actualizado');
    } catch (error) {
      next(error);
    }
  }

  async deleteCustomer(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const data = await this.customerServices.deleteCustomer(id);

      if (!data) {
        return this.httpResponse.NOT_FOUND(res, 'No existe Customer');
      }
      return this.httpResponse.OK(res, data, 'Customer eliminado');
    } catch (error) {
      next(error);
    }
  }
}
