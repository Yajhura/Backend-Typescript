import { baseDTO } from '@config/base.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class PurchaseProductDTO extends baseDTO {
  @IsNotEmpty()
  @IsNumber()
  totalPrice!: number;

  @IsNotEmpty()
  @IsNumber()
  quantityProduct!: number;
}
