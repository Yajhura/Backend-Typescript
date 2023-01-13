import { BaseServices } from '@config/base.services';
import { ProductDTO } from '@product/dto/product.dto';
import { PurchaseDTO } from '@purchase/dto/purchase.dto';
import { PurchaseEntity } from '@purchase/entities/purchase.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

export class PurchaseServices extends BaseServices<PurchaseEntity> {
  constructor() {
    super(PurchaseEntity);
  }

  async findAll(): Promise<PurchaseEntity[]> {
    return (await this.execRepository).find();
  }

  async findPurchaseById(id: string): Promise<PurchaseEntity | null> {
    return (await this.execRepository).findOneBy({ id: id });
  }
  async createPurchase(body: PurchaseDTO): Promise<PurchaseEntity> {
    return (await this.execRepository).save(body);
  }

  async updatePurchase(id: string, body: ProductDTO): Promise<UpdateResult> {
    return (await this.execRepository).update(id, body);
  }

  async deletePurchase(id: string): Promise<DeleteResult> {
    return (await this.execRepository).delete(id);
  }
}
