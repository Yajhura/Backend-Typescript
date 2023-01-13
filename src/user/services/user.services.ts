import { BaseServices } from '@config/base.services';
import { UserDTO } from '@user/dto/user.dto';
import { UserEntity } from '@user/entities/user.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

export class UserServices extends BaseServices<UserEntity> {
  constructor() {
    super(UserEntity);
  }

  async findAll(): Promise<UserEntity[]> {
    return (await this.execRepository).find();
  }

  async findUserById(id: string): Promise<UserEntity | null> {
    return (await this.execRepository).findOneBy({ id: id });
  }

  async createUser(body: UserDTO): Promise<UserEntity> {
    return (await this.execRepository).save(body);
  }
  async updateUser(id: string, body: UserDTO): Promise<UpdateResult> {
    return (await this.execRepository).update({ id }, body);
  }
  async deleteUser(id: string): Promise<DeleteResult> {
    return (await this.execRepository).delete({ id });
  }
}
