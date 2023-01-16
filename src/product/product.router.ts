import { baseRouter } from '@shared/base.router';
import { catchAsync } from 'utils/utils-expres-config';

import { ProductController } from './controller/product.controller';
import { ProductMiddleware } from './middleware/product.middleware';

export class productRouter extends baseRouter<ProductController, ProductMiddleware> {
  constructor() {
    super(ProductController, ProductMiddleware);
  }

  routes(): void {
    this.router.get(
      '/products',

      catchAsync((req: any, res: any) => this.controller.getProducts(req, res)),
    );
    this.router.get(
      '/products/:id',
      catchAsync((req: any, res: any) => this.controller.getProductById(req, res)),
    );
    this.router.post(
      '/products',
      (req: any, res: any, next: any) => this.middlewares.ProductValidator(req, res, next),
      catchAsync((req: any, res: any) => this.controller.createProduct(req, res)),
    );
    this.router.put(
      '/products/:id',
      (req: any, res: any, next: any) => this.middlewares.ProductValidator(req, res, next),
      catchAsync((req: any, res: any) => this.controller.updateProduct(req, res)),
    );
    this.router.delete(
      '/products/:id',
      catchAsync((req: any, res: any) => this.controller.deleteProduct(req, res)),
    );
  }
}
