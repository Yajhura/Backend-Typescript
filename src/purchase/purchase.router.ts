import { baseRouter } from '@shared/base.router';

import { PurchaseController } from './controller/purchase.controller';

export class PurchaseRouter extends baseRouter<PurchaseController> {
  constructor() {
    super(PurchaseController);
  }

  routes(): void {
    this.router.get('/purchase', (req, res, next) => this.controller.getPurchases(req, res, next));
    this.router.get('/purchase/:id', (req, res, next) => this.controller.getPurchaseById(req, res, next));
    this.router.post('/purchase', (req, res, next) => this.controller.createPurchase(req, res, next));
    this.router.put('/purchase/:id', (req, res, next) => this.controller.updatePurchase(req, res, next));
    this.router.delete('/purchase/:id', (req, res, next) => this.controller.deletePurchase(req, res, next));
  }
}
