import { HttpResponse } from '@shared/response/http.response';
import { NextFunction, Request, Response } from 'express';

import { ProductServices } from '../services/product.services';

export class ProductController {
  constructor(
    private readonly productServices: ProductServices = new ProductServices(),
    private readonly httpResponse: HttpResponse = new HttpResponse(),
  ) {}

  async getProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.productServices.findAll();

      if (data.length === 0) {
        return this.httpResponse.NOT_FOUND(res, 'No existe datos');
      }

      return this.httpResponse.OK(res, data);
    } catch (error) {
      next(error);
    }
  }

  async getProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const data = await this.productServices.findProductById(id);

      if (!data) {
        return this.httpResponse.NOT_FOUND(res, 'No existe producto');
      }

      return this.httpResponse.OK(res, data);
    } catch (error) {
      next(error);
    }
  }

  async createProduct(req: Request, res: Response, next: NextFunction) {
    const { body } = req;
    try {
      const data = await this.productServices.createProduct(body);

      return this.httpResponse.CREATED(res, data, 'Producto creado');
    } catch (error) {
      next(error);
    }
  }

  async updateProduct(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { body } = req;
    try {
      const data = await this.productServices.updateProduct(id, body);

      return this.httpResponse.OK(res, data, 'Producto actualizado');
    } catch (error) {
      next(error);
    }
  }

  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const data = await this.productServices.deleteProduct(id);

      return this.httpResponse.OK(res, data, 'Producto eliminado');
    } catch (error) {
      next(error);
    }
  }
}
