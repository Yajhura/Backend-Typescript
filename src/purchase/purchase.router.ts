import { baseRouter } from '@shared/base.router';
import { catchAsync } from 'utils/utils-expres-config';

import { PurchaseController } from './controller/purchase.controller';

export class PurchaseRouter extends baseRouter<PurchaseController> {
  constructor() {
    super(PurchaseController);
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
      catchAsync((req: any, res: any) => this.controller.createPurchase(req, res)),
    );
    this.router.put(
      '/purchase/:id',
      catchAsync((req: any, res: any) => this.controller.updatePurchase(req, res)),
    );
    this.router.delete(
      '/purchase/:id',
      catchAsync((req: any, res: any) => this.controller.deletePurchase(req, res)),
    );
  }
}
