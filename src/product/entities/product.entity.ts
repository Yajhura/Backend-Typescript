import { CategoryEntity } from '@category/entities/categories.entity';
import { BaseEntity } from '@config/base.entity';
import { PurchaseProductsEntity } from '@purchase/entities/purchases-products.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'product' })
export class ProductoEntity extends BaseEntity {
  @Column()
  productName!: string;

  @Column()
  description!: string;

  @Column()
  price!: number;

  @ManyToOne(() => CategoryEntity, (category) => category.products, { nullable: false })
  @JoinColumn({ name: 'category_id' })
  category!: CategoryEntity;

  @OneToMany(() => PurchaseProductsEntity, (purchase) => purchase.product)
  purchaseProduct!: PurchaseProductsEntity[];
}
