import { CustomerServices } from '@customer/services/customer.services';
import { Request, Response } from 'express';

import { HttpResponse } from './../../shared/response/http.response';

export class CustomerController {
  constructor(
    private readonly customerServices: CustomerServices = new CustomerServices(),
    private readonly httpResponse: HttpResponse = new HttpResponse(),
  ) {}

  async getCustomers(req: Request, res: Response) {
    const data = await this.customerServices.findAll();

    if (data.length === 0) {
      return this.httpResponse.NOT_FOUND(res, 'No existe datos');
    }

    return this.httpResponse.OK(res, data);
  }

  async getCustomerById(req: Request, res: Response) {
    const { id } = req.params;

    const data = await this.customerServices.findCustomerById(id);

    if (!data) {
      return this.httpResponse.NOT_FOUND(res, 'No existe Customer');
    }

    return this.httpResponse.OK(res, data);
  }

  async createCustomer(req: Request, res: Response) {
    const { body } = req;

    const data = await this.customerServices.createCustomer(body);

    return this.httpResponse.CREATED(res, data, 'Customer creado');
  }

  async updateCustomer(req: Request, res: Response) {
    const { id } = req.params;
    const { body } = req;

    const data = await this.customerServices.updateCustomer(id, body);
    if (!data) {
      return this.httpResponse.NOT_FOUND(res, 'No existe Customer');
    }
    return this.httpResponse.OK(res, data, 'Customer actualizado');
  }

  async deleteCustomer(req: Request, res: Response) {
    const { id } = req.params;

    const data = await this.customerServices.deleteCustomer(id);

    if (!data) {
      return this.httpResponse.NOT_FOUND(res, 'No existe Customer');
    }
    return this.httpResponse.OK(res, data, 'Customer eliminado');
  }
}
