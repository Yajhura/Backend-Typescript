import { CategoryServices } from '@category/services/category.services';
import { NextFunction, Request, Response } from 'express';

import { HttpResponse } from './../../shared/response/http.response';

export class CategoryController {
  constructor(
    private readonly categoryServices: CategoryServices = new CategoryServices(),
    private readonly httpResponse: HttpResponse = new HttpResponse(),
  ) {}

  async getCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.categoryServices.findAll();

      if (data.length === 0) {
        return this.httpResponse.NOT_FOUND(res, 'No existe datos');
      }

      return this.httpResponse.OK(res, data);
    } catch (error) {
      next(error);
    }
  }

  async getCategoryById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const data = await this.categoryServices.findCategoryById(id);

      if (!data) {
        return this.httpResponse.NOT_FOUND(res, 'No existe categoria');
      }

      return this.httpResponse.OK(res, data);
    } catch (error) {
      next(error);
    }
  }

  async createCategory(req: Request, res: Response, next: NextFunction) {
    const { body } = req;
    try {
      const data = await this.categoryServices.createCategory(body);

      return this.httpResponse.CREATED(res, data, 'Categoria creado');
    } catch (error) {
      next(error);
    }
  }

  async updateCategory(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { body } = req;
    try {
      const data = await this.categoryServices.updateCategory(id, body);
      if (!data) {
        return this.httpResponse.NOT_FOUND(res, 'No existe categoria');
      }
      return this.httpResponse.OK(res, data, 'Categoria actualizado');
    } catch (error) {
      next(error);
    }
  }

  async deleteCategory(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const data = await this.categoryServices.deleteCategory(id);

      if (!data) {
        return this.httpResponse.NOT_FOUND(res, 'No existe categoria');
      }
      return this.httpResponse.OK(res, data, 'Categoria eliminado');
    } catch (error) {
      next(error);
    }
  }
}
