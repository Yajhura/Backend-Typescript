import { baseRouter } from '@shared/base.router';
import { catchAsync } from 'utils/utils-expres-config';

import { ProductController } from './controller/product.controller';

export class productRouter extends baseRouter<ProductController> {
  constructor() {
    super(ProductController);
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
      catchAsync((req: any, res: any) => this.controller.createProduct(req, res)),
    );
    this.router.put(
      '/products/:id',
      catchAsync((req: any, res: any) => this.controller.updateProduct(req, res)),
    );
    this.router.delete(
      '/products/:id',
      catchAsync((req: any, res: any) => this.controller.deleteProduct(req, res)),
    );
  }
}
