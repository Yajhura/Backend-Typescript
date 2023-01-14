import { CategoryServices } from '@category/services/category.services';
import { Request, Response } from 'express';

import { HttpResponse } from './../../shared/response/http.response';

export class CategoryController {
  constructor(
    private readonly categoryServices: CategoryServices = new CategoryServices(),
    private readonly httpResponse: HttpResponse = new HttpResponse(),
  ) {}

  async getCategory(req: Request, res: Response) {
    const data = await this.categoryServices.findAll();

    if (data.length === 0) {
      return this.httpResponse.NOT_FOUND(res, 'No existe datos');
    }

    return this.httpResponse.OK(res, data);
  }

  async getCategoryById(req: Request, res: Response) {
    const { id } = req.params;

    const data = await this.categoryServices.findCategoryById(id);

    if (!data) {
      return this.httpResponse.NOT_FOUND(res, 'No existe categoria');
    }

    return this.httpResponse.OK(res, data);
  }

  async createCategory(req: Request, res: Response) {
    const { body } = req;

    const data = await this.categoryServices.createCategory(body);

    return this.httpResponse.CREATED(res, data, 'Categoria creado');
  }

  async updateCategory(req: Request, res: Response) {
    const { id } = req.params;
    const { body } = req;

    const data = await this.categoryServices.updateCategory(id, body);
    if (!data) {
      return this.httpResponse.NOT_FOUND(res, 'No existe categoria');
    }
    return this.httpResponse.OK(res, data, 'Categoria actualizado');
  }

  async deleteCategory(req: Request, res: Response) {
    const { id } = req.params;

    const data = await this.categoryServices.deleteCategory(id);

    if (!data) {
      return this.httpResponse.NOT_FOUND(res, 'No existe categoria');
    }
    return this.httpResponse.OK(res, data, 'Categoria eliminado');
  }
}
