import { CategoryEntity } from '@category/entities/categories.entity';
import { BaseServices } from '@config/base.services';
import { CustomerDTO } from '@customer/dto/customer.dto';
import { CustomerEntity } from '@customer/entities/customer.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

export class CustomerServices extends BaseServices<CustomerEntity> {
  constructor() {
    super(CategoryEntity);
  }

  async findAll(): Promise<CustomerEntity[]> {
    return await (await this.execRepository).find();
  }

  async findCustomerById(id: string): Promise<CustomerEntity | null> {
    return await (await this.execRepository).findOneBy({ id });
  }

  async createCustomer(body: CustomerEntity): Promise<CustomerEntity> {
    return (await this.execRepository).create(body);
  }

  async updateCustomer(id: string, body: CustomerDTO): Promise<UpdateResult> {
    return (await this.execRepository).update(id, body);
  }

  async deleteCustomer(id: string): Promise<DeleteResult> {
    return (await this.execRepository).delete(id);
  }
}
