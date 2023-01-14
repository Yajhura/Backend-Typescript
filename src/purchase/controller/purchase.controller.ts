import { PurchaseServices } from '@purchase/services/purchase.services';
import { HttpResponse } from '@shared/response/http.response';
import { Request, Response } from 'express';

export class PurchaseController {
  constructor(
    private readonly pruchaseServices: PurchaseServices = new PurchaseServices(),
    private readonly httpResponse: HttpResponse = new HttpResponse(),
  ) {}

  async getPurchases(req: Request, res: Response) {
    const data = await this.pruchaseServices.findAll();

    if (data.length === 0) {
      return this.httpResponse.NOT_FOUND(res, 'No existe datos');
    }

    return this.httpResponse.OK(res, data);
  }

  async getPurchaseById(req: Request, res: Response) {
    const { id } = req.params;

    const data = await this.pruchaseServices.findPurchaseById(id);

    if (!data) {
      return this.httpResponse.NOT_FOUND(res, 'No existe Purchase');
    }

    return this.httpResponse.OK(res, data);
  }

  async createPurchase(req: Request, res: Response) {
    const { body } = req;

    const data = await this.pruchaseServices.createPurchase(body);

    return this.httpResponse.CREATED(res, data, 'Purchase creado');
  }

  async updatePurchase(req: Request, res: Response) {
    const { id } = req.params;
    const { body } = req;

    const data = await this.pruchaseServices.updatePurchase(id, body);

    return this.httpResponse.OK(res, data, 'Purchase actualizado');
  }

  async deletePurchase(req: Request, res: Response) {
    const { id } = req.params;

    const data = await this.pruchaseServices.deletePurchase(id);

    return this.httpResponse.OK(res, data, 'purchase eliminado');
  }
}
