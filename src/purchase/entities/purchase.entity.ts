import { BaseEntity } from '@config/base.entity';
import { CustomerEntity } from '@customer/entities/customer.entity';
import { PurchaseProductsEntity } from 'custom/entities/purchases-products.entity';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';

@Entity({ name: 'purchase' })
export class PurchaseEntity extends BaseEntity {
  @Column()
  status!: string;

  @Column()
  paymentMethod!: string;

  @ManyToOne(() => CustomerEntity, (customer) => customer.purchases)
  @JoinColumn({ name: 'customer_id' })
  customer!: CustomerEntity;

  @ManyToMany(() => PurchaseProductsEntity, (purchaseProduct) => purchaseProduct.purchase)
  purchaseProduct!: PurchaseProductsEntity[];
}
