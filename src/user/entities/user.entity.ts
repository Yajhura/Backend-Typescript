import { BaseEntity } from '@config/base.entity';
import { CustomerEntity } from '@customer/entities/customer.entity';
import { RoleType } from '@user/dto/user.dto';
import { Column, Entity, OneToOne } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @Column()
  username!: string;

  @Column()
  name!: string;

  @Column()
  lastname!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  city!: string;

  @Column()
  province!: string;

  @Column({ type: 'enum', enum: RoleType, nullable: false, default: RoleType.USER })
  role!: string;

  @OneToOne(() => CustomerEntity, (customer) => customer.user)
  customer!: CustomerEntity;
}
