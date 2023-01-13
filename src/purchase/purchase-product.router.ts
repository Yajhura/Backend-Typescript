import { baseRouter } from '@shared/base.router';

import { PurchaseProductController } from './controller/purchase-product.controller';

export class PurchaseProductRouter extends baseRouter<PurchaseProductController> {
  constructor() {
    super(PurchaseProductController);
  }

  routes(): void {
    this.router.get('/purchaseProducts', (req, res, next) => this.controller.getPurchasesProducts(req, res, next));
    this.router.get('/purchaseProducts/:id', (req, res, next) =>
      this.controller.getPurchaseProductById(req, res, next),
    );
    this.router.post('/purchaseProducts', (req, res, next) => this.controller.createPurchaseProduct(req, res, next));
    this.router.put('/purchaseProducts/:id', (req, res, next) => this.controller.updatePurchaseProduct(req, res, next));
    this.router.delete('/purchaseProducts/:id', (req, res, next) =>
      this.controller.deletePurchaseProduct(req, res, next),
    );
  }
}
