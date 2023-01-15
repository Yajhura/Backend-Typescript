import { BaseEntity } from '@config/base.entity';
import { ProductoEntity } from '@product/entities/product.entity';
import { Column, Entity, OneToMany } from 'typeorm';

export enum EColorBadge {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  SUCCESS = 'success',
  DANGER = 'danger',
  WARNING = 'warning',
  INFO = 'info',
}

@Entity({ name: 'category' })
export class CategoryEntity extends BaseEntity {
  @Column()
  categoryName!: string;

  @Column({ type: 'enum', enum: EColorBadge, default: EColorBadge.PRIMARY })
  colorBadge?: string;

  @OneToMany(() => ProductoEntity, (product) => product.category)
  products!: ProductoEntity[];
}
