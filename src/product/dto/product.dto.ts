import { baseDTO } from '@config/base.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ProductDTO extends baseDTO {
  @IsNotEmpty()
  product_name!: string;

  @IsNotEmpty()
  description!: string;

  @IsNumber()
  @IsNotEmpty()
  price!: number;
}
