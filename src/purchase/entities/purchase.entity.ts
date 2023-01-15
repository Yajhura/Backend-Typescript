import { BaseEntity } from '@config/base.entity';
import { CustomerEntity } from '@customer/entities/customer.entity';
import { PurchaseProductsEntity } from '@purchase/entities/purchases-products.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'purchase' })
export class PurchaseEntity extends BaseEntity {
  @Column()
  status!: string;

  @Column()
  paymentMethod!: string;

  @ManyToOne(() => CustomerEntity, (customer) => customer.purchases, { nullable: false })
  @JoinColumn({ name: 'customer_id' })
  customer!: CustomerEntity;

  @OneToMany(() => PurchaseProductsEntity, (purchaseProduct) => purchaseProduct.purchase)
  purchaseProduct!: PurchaseProductsEntity[];
}
