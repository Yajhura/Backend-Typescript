import { baseRouter } from '@shared/base.router';
import { catchAsync } from 'utils/utils-expres-config';

import { CategoryController } from './controller/category.controller';

export class CategoryRouter extends baseRouter<CategoryController> {
  constructor() {
    super(CategoryController);
  }

  routes(): void {
    this.router.get(
      '/category',
      catchAsync((req: any, res: any) => this.controller.getCategory(req, res)),
    );
    this.router.get(
      '/category/:id',
      catchAsync((req: any, res: any) => this.controller.getCategoryById(req, res)),
    );
    this.router.post(
      '/category',
      catchAsync((req: any, res: any) => this.controller.createCategory(req, res)),
    );
    this.router.put(
      '/category/:id',
      catchAsync((req: any, res: any) => this.controller.updateCategory(req, res)),
    );
    this.router.delete(
      '/category/:id',
      catchAsync((req: any, res: any) => this.controller.deleteCategory(req, res)),
    );
  }
}
