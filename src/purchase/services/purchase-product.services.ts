import { BaseServices } from '@config/base.services';
import { PurchaseProductDTO } from '@purchase/dto/purchase-product.dto';
import { PurchaseProductsEntity } from '@purchase/entities/purchases-products.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

import { ProductServices } from '../../product/services/product.services';

export class PurchaseProductServices extends BaseServices<PurchaseProductsEntity> {
  constructor(private readonly productServices: ProductServices = new ProductServices()) {
    super(PurchaseProductsEntity);
  }

  async findAll(): Promise<PurchaseProductsEntity[]> {
    return (await this.execRepository).find();
  }

  async findPurchaseProductById(id: string): Promise<PurchaseProductsEntity | null> {
    return (await this.execRepository).findOneBy({ id: id });
  }
  async createPurchaseProduct(body: PurchaseProductDTO): Promise<PurchaseProductsEntity> {
    const newPP = (await this.execRepository).create(body)

    const product = await this.productServices.findProductById(newPP.product.id);

    newPP.totalPrice = product!.price * newPP.quantityProduct;
    return (await this.execRepository).save(newPP);
  }

  async updatePurchaseProduct(id: string, body: PurchaseProductDTO): Promise<UpdateResult> {
    return (await this.execRepository).update(id, body);
  }

  async deletePurchaseProduct(id: string): Promise<DeleteResult> {
    return (await this.execRepository).delete(id);
  }
}
