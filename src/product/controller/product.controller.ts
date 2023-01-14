import { HttpResponse } from '@shared/response/http.response';
import { Request, Response } from 'express';

import { ProductServices } from '../services/product.services';

export class ProductController {
  constructor(
    private readonly productServices: ProductServices = new ProductServices(),
    private readonly httpResponse: HttpResponse = new HttpResponse(),
  ) {}

  async getProducts(req: Request, res: Response) {
    const data = await this.productServices.findAll();

    if (data.length === 0) {
      return this.httpResponse.NOT_FOUND(res, 'No existe datos');
    }

    return this.httpResponse.OK(res, data);
  }

  async getProductById(req: Request, res: Response) {
    const { id } = req.params;

    const data = await this.productServices.findProductById(id);

    if (!data) {
      return this.httpResponse.NOT_FOUND(res, 'No existe producto');
    }

    return this.httpResponse.OK(res, data);
  }

  async createProduct(req: Request, res: Response) {
    const { body } = req;

    const data = await this.productServices.createProduct(body);

    return this.httpResponse.CREATED(res, data, 'Producto creado');
  }

  async updateProduct(req: Request, res: Response) {
    const { id } = req.params;
    const { body } = req;

    const data = await this.productServices.updateProduct(id, body);

    return this.httpResponse.OK(res, data, 'Producto actualizado');
  }

  async deleteProduct(req: Request, res: Response) {
    const { id } = req.params;

    const data = await this.productServices.deleteProduct(id);

    return this.httpResponse.OK(res, data, 'Producto eliminado');
  }
}
