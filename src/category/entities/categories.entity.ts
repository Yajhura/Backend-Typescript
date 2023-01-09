import { BaseEntity } from '@config/base.entity';
import { ProductoEntity } from '@product/entities/product.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'category' })
export class CategoryEntity extends BaseEntity {
  @Column()
  category_name!: string;

  @OneToMany(() => ProductoEntity, (product) => product.category)
  products!: ProductoEntity[];
}
