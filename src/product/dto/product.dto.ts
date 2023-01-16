import { CategoryEntity } from '@category/entities/categories.entity';
import { baseDTO } from '@config/base.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ProductDTO extends baseDTO {
  @IsNotEmpty()
  productName!: string;

  @IsNotEmpty()
  description!: string;

  @IsNumber()
  @IsNotEmpty()
  price!: number;

  @IsNotEmpty()
  category!: CategoryEntity;
}
