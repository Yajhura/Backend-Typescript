import { baseRouter } from '@shared/base.router';

import { CategoryController } from './controller/category.controller';

export class CategoryRouter extends baseRouter<CategoryController> {
  constructor() {
    super(CategoryController);
  }

  routes(): void {
    this.router.get('/category', (req, res, next) => this.controller.getCategory(req, res, next));
    this.router.get('/category/:id', (req, res, next) => this.controller.getCategoryById(req, res, next));
    this.router.post('/category', (req, res, next) => this.controller.createCategory(req, res, next));
    this.router.put('/category/:id', (req, res, next) => this.controller.updateCategory(req, res, next));
    this.router.delete('/category/:id', (req, res, next) => this.controller.deleteCategory(req, res, next));
  }
}
