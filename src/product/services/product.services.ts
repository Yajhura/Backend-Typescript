import { BaseServices } from '@config/base.services';
import { ProductDTO } from '@product/dto/product.dto';
import { ProductoEntity } from '@product/entities/product.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

export class ProductServices extends BaseServices<ProductoEntity> {
  constructor() {
    super(ProductoEntity);
  }

  async findAll(): Promise<ProductoEntity[]> {
    return (await this.execRepository).find();
  }

  async findProductById(id: string): Promise<ProductoEntity | null> {
    return (await this.execRepository).findOneBy({ id: id });
  }

  async findProductWithRelation(id: string): Promise<ProductoEntity | null> {
    return (await this.execRepository)
      .createQueryBuilder('product')                     
      .leftJoinAndSelect('product.category', 'category')
      .where({ id })
      .getOne();
  }

  async createProduct(body: ProductDTO): Promise<ProductoEntity> {
    return (await this.execRepository).save(body);
  }

  async updateProduct(id: string, body: ProductDTO): Promise<UpdateResult> {
    return (await this.execRepository).update(id, body);
  }

  async deleteProduct(id: string): Promise<DeleteResult> {
    return (await this.execRepository).delete({ id });
  }
}
