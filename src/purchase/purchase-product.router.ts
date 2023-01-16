import { baseRouter } from '@shared/base.router';
import { catchAsync } from 'utils/utils-expres-config';

import { PurchaseProductController } from './controller/purchase-product.controller';
import { PurchaseProductsMiddleware } from './middleware/purchaseProduct.middleware';

export class PurchaseProductRouter extends baseRouter<PurchaseProductController, PurchaseProductsMiddleware> {
  constructor() {
    super(PurchaseProductController, PurchaseProductsMiddleware);
  }

  routes(): void {
    this.router.get(
      '/purchase-products',
      catchAsync((req: any, res: any) => this.controller.getPurchasesProducts(req, res)),
    );
    this.router.get(
      '/purchase-products/:id',
      catchAsync((req: any, res: any) => this.controller.getPurchaseProductById(req, res)),
    );
    this.router.post(
      '/purchase-products',
      (req: any, res: any, next: any) => this.middlewares.PurchaseProductsValidator(req, res, next),
      catchAsync((req: any, res: any) => this.controller.createPurchaseProduct(req, res)),
    );
    this.router.put(
      '/purchase-products/:id',
      (req: any, res: any, next: any) => this.middlewares.PurchaseProductsValidator(req, res, next),
      catchAsync((req: any, res: any) => this.controller.updatePurchaseProduct(req, res)),
    );
    this.router.delete(
      '/purchase-products/:id',
      catchAsync((req: any, res: any) => this.controller.deletePurchaseProduct(req, res)),
    );
  }
}
