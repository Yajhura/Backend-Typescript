import { PurchaseProductServices } from '@purchase/services/purchase-product.services';
import { HttpResponse } from '@shared/response/http.response';
import { Request, Response } from 'express';

export class PurchaseProductController {
  constructor(
    private readonly pruchaseServices: PurchaseProductServices = new PurchaseProductServices(),
    private readonly httpResponse: HttpResponse = new HttpResponse(),
  ) {}

  async getPurchasesProducts(req: Request, res: Response) {
    const data = await this.pruchaseServices.findAll();

    if (data.length === 0) {
      return this.httpResponse.NOT_FOUND(res, 'No existe datos');
    }

    return this.httpResponse.OK(res, data);
  }

  async getPurchaseProductById(req: Request, res: Response) {
    const { id } = req.params;

    const data = await this.pruchaseServices.findPurchaseProductById(id);

    if (!data) {
      return this.httpResponse.NOT_FOUND(res, 'No existe Purchase Product');
    }

    return this.httpResponse.OK(res, data);
  }

  async createPurchaseProduct(req: Request, res: Response) {
    const { body } = req;

    const data = await this.pruchaseServices.createPurchaseProduct(body);

    return this.httpResponse.CREATED(res, data, 'Purchase Product creado');
  }

  async updatePurchaseProduct(req: Request, res: Response) {
    const { id } = req.params;
    const { body } = req;

    const data = await this.pruchaseServices.updatePurchaseProduct(id, body);
    if (!data.affected) {
      return this.httpResponse.NOT_FOUND(res, 'No existe Purchase Product');
    }
    return this.httpResponse.OK(res, data, 'Purchase Product actualizado');
  }

  async deletePurchaseProduct(req: Request, res: Response) {
    const { id } = req.params;

    const data = await this.pruchaseServices.deletePurchaseProduct(id);
    if (!data.affected) {
      return this.httpResponse.NOT_FOUND(res, 'No existe Purchase Product');
    }
    return this.httpResponse.OK(res, data, 'purchase product eliminado');
  }
}
