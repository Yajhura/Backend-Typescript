import { CategoryDTO } from '@category/dto/category.dto';
import { CategoryEntity } from '@category/entities/categories.entity';
import { BaseServices } from '@config/base.services';
import { DeleteResult, UpdateResult } from 'typeorm';

export class CategoryServices extends BaseServices<CategoryEntity> {
  constructor() {
    super(CategoryEntity);
  }

  async findAll(): Promise<CategoryEntity[]> {
    return await (await this.execRepository).find();
  }

  async findCategoryById(id: string): Promise<CategoryEntity | null> {
    return await (await this.execRepository).findOneBy({ id });
  }

  async createCategory(body: CategoryEntity): Promise<CategoryEntity> {
    return (await this.execRepository).create(body);
  }

  async updateCategory(id: string, body: CategoryDTO): Promise<UpdateResult> {
    return (await this.execRepository).update(id, body);
  }

  async deleteCategory(id: string): Promise<DeleteResult> {
    return (await this.execRepository).delete(id);
  }
}
