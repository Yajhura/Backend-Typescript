import { BaseEntity } from '@config/base.entity';
import { ProductoEntity } from '@product/entities/product.entity';
import { PurchaseEntity } from '@purchase/entities/purchase.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'purchases_products' })
export class PurchaseProductsEntity extends BaseEntity {


  @Column()
  quantityProduct!: number;

  @Column()
  totalPrice!: number;


  @ManyToOne(() => PurchaseEntity, (purchase) => purchase.purchaseProduct)
  @JoinColumn({
    name: 'purchase_id',
  })
  purchase!: PurchaseEntity;

  @ManyToOne(() => ProductoEntity, (product) => product.purchaseProduct)
  @JoinColumn({
    name: 'product_id',
  })
  product!: ProductoEntity;
}
