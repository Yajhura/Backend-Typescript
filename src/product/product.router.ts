import { baseRouter } from '@shared/base.router';

import { ProductController } from './controller/product.controller';

export class productRouter extends baseRouter<ProductController> {
  constructor() {
    super(ProductController);
  }

  routes(): void {
    this.router.get('/products', (req, res, next) => this.controller.getProducts(req, res, next));
    this.router.get('/products/:id', (req, res, next) => this.controller.getProductById(req, res, next));
    this.router.post('/products', (req, res, next) => this.controller.createProduct(req, res, next));
    this.router.put('/products/:id', (req, res, next) => this.controller.updateProduct(req, res, next));
    this.router.delete('/products/:id', (req, res, next) => this.controller.deleteProduct(req, res, next));
  }
}
