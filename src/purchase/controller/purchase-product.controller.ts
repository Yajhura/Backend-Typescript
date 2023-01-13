import { PurchaseProductServices } from '@purchase/services/purchase-product.services';
import { HttpResponse } from '@shared/response/http.response';
import { NextFunction, Request, Response } from 'express';

export class PurchaseProductController {
  constructor(
    private readonly pruchaseServices: PurchaseProductServices = new PurchaseProductServices(),
    private readonly httpResponse: HttpResponse = new HttpResponse(),
  ) {}

  async getPurchasesProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.pruchaseServices.findAll();

      if (data.length === 0) {
        return this.httpResponse.NOT_FOUND(res, 'No existe datos');
      }

      return this.httpResponse.OK(res, data);
    } catch (error) {
      next(error);
    }
  }

  async getPurchaseProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const data = await this.pruchaseServices.findPurchaseProductById(id);

      if (!data) {
        return this.httpResponse.NOT_FOUND(res, 'No existe Purchase');
      }

      return this.httpResponse.OK(res, data);
    } catch (error) {
      next(error);
    }
  }

  async createPurchaseProduct(req: Request, res: Response, next: NextFunction) {
    const { body } = req;
    try {
      const data = await this.pruchaseServices.createPurchaseProduct(body);

      return this.httpResponse.CREATED(res, data, 'Purchase creado');
    } catch (error) {
      next(error);
    }
  }

  async updatePurchaseProduct(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { body } = req;
    try {
      const data = await this.pruchaseServices.updatePurchaseProduct(id, body);

      return this.httpResponse.OK(res, data, 'Purchase actualizado');
    } catch (error) {
      next(error);
    }
  }

  async deletePurchaseProduct(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const data = await this.pruchaseServices.deletePurchaseProduct(id);

      return this.httpResponse.OK(res, data, 'purchase eliminado');
    } catch (error) {
      next(error);
    }
  }
}
