import { BaseEntity } from '@config/base.entity';
import { PurchaseEntity } from '@purchase/entities/purchase.entity';
import { UserEntity } from '@user/entities/user.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

@Entity({ name: 'customer' })
export class CustomerEntity extends BaseEntity {
  @OneToOne(() => UserEntity, (user) => user.customer)
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity;

  @Column()
  address!: string;

  @Column()
  dni!: number;

  @OneToMany(() => PurchaseEntity, (purchase) => purchase.customer)
  purchases!: PurchaseEntity[];
}
