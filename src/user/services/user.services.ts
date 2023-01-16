import { BaseServices } from '@config/base.services';
import { UserDTO } from '@user/dto/user.dto';
import { UserEntity } from '@user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { DeleteResult, UpdateResult } from 'typeorm';

import { RoleType } from '../dto/user.dto';

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

  async findUserByEmail(email: string): Promise<UserEntity | null> {
    return (await this.execRepository).createQueryBuilder('user').addSelect('user.password').where({ email }).getOne();
  }

  async findUserWithRole(id: string, role: RoleType): Promise<UserEntity | null> {
    const user = (await this.execRepository).createQueryBuilder('user').where({ id }).andWhere({ role }).getOne();

    return user;
  }

  async findUserWithRelation(id: string): Promise<UserEntity | null> {
    return (await this.execRepository)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.customer', 'customer')
      .where({ id })
      .getOne();
  }
  async findUserWithRelationByUsername(username: string): Promise<UserEntity | null> {
    return (await this.execRepository)
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where({ username })
      .getOne();
  }
  async createUser(body: UserDTO): Promise<UserEntity> {
    const hastPassword = await bcrypt.hash(body.password, 10);

    const newUser = { ...body, password: hastPassword };

    return (await this.execRepository).save(newUser);
  }
  async updateUser(id: string, body: UserDTO): Promise<UpdateResult> {
    return (await this.execRepository).update({ id }, body);
  }
  async deleteUser(id: string): Promise<DeleteResult> {
    return (await this.execRepository).delete({ id });
  }
}
