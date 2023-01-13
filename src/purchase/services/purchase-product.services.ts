import { BaseServices } from '@config/base.services';
import { ProductDTO } from '@product/dto/product.dto';
import { PurchaseProductDTO } from '@purchase/dto/purchase-product.dto';
import { PurchaseProductsEntity } from '@purchase/entities/purchases-products.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

export class PurchaseProductServices extends BaseServices<PurchaseProductsEntity> {
  constructor() {
    super(PurchaseProductsEntity);
  }

  async findAll(): Promise<PurchaseProductsEntity[]> {
    return (await this.execRepository).find();
  }

  async findPurchaseProductById(id: string): Promise<PurchaseProductsEntity | null> {
    return (await this.execRepository).findOneBy({ id: id });
  }
  async createPurchaseProduct(body: PurchaseProductDTO): Promise<PurchaseProductsEntity> {
    return (await this.execRepository).save(body);
  }

  async updatePurchaseProduct(id: string, body: ProductDTO): Promise<UpdateResult> {
    return (await this.execRepository).update(id, body);
  }

  async deletePurchaseProduct(id: string): Promise<DeleteResult> {
    return (await this.execRepository).delete(id);
  }
}
