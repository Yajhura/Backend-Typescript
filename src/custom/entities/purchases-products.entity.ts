import { BaseEntity } from '@config/base.entity';
import { ProductoEntity } from '@product/entities/product.entity';
import { PurchaseEntity } from '@purchase/entities/purchase.entity';
import { Column, Entity, JoinColumn, ManyToMany } from 'typeorm';

@Entity({ name: 'purchases_products' })
export class PurchaseProductsEntity extends BaseEntity {
  @Column()
  totalPrice!: number;

  @Column()
  quantityProduct!: number;

  @ManyToMany(() => PurchaseEntity, (purchase) => purchase.purchaseProduct)
  @JoinColumn({ name: 'purchase_id' })
  purchase!: PurchaseEntity[];

  @ManyToMany(() => ProductoEntity, (product) => product.purchaseProduct)
  @JoinColumn({ name: 'product_id' })
  product!: ProductoEntity[];
}
