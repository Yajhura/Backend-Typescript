import { CategoryEntity } from '@category/entities/categories.entity';
import { BaseEntity } from '@config/base.entity';
import { PurchaseProductsEntity } from 'custom/entities/purchases-products.entity';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';

@Entity({ name: 'product' })
export class ProductoEntity extends BaseEntity {
  @Column()
  product_name!: string;

  @Column()
  description!: string;

  @Column()
  price!: number;

  @ManyToOne(() => CategoryEntity, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category!: CategoryEntity;

  @ManyToMany(() => PurchaseProductsEntity, (purchase) => purchase.product)
  purchaseProduct!: PurchaseProductsEntity[];
}
