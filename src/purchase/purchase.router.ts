import { baseRouter } from '@shared/base.router';
import { catchAsync } from 'utils/utils-expres-config';

import { PurchaseController } from './controller/purchase.controller';
import { PurchaseMiddleware } from './middleware/purchase.middleware';

export class PurchaseRouter extends baseRouter<PurchaseController, PurchaseMiddleware> {
  constructor() {
    super(PurchaseController, PurchaseMiddleware);
  }

  routes(): void {
    this.router.get(
      '/purchase',
      catchAsync((req: any, res: any) => this.controller.getPurchases(req, res)),
    );
    this.router.get(
      '/purchase/:id',
      catchAsync((req: any, res: any) => this.controller.getPurchaseById(req, res)),
    );
    this.router.post(
      '/purchase',
      (req: any, res: any, next: any) => this.middlewares.PurchaseValidator(req, res, next),
      catchAsync((req: any, res: any) => this.controller.createPurchase(req, res)),
    );
    this.router.put(
      '/purchase/:id',
      (req: any, res: any, next: any) => this.middlewares.PurchaseValidator(req, res, next),
      catchAsync((req: any, res: any) => this.controller.updatePurchase(req, res)),
    );
    this.router.delete(
      '/purchase/:id',
      catchAsync((req: any, res: any) => this.controller.deletePurchase(req, res)),
    );
  }
}
