import { baseDTO } from '@config/base.dto';
import { IsNotEmpty } from 'class-validator';

export class PurchaseDTO extends baseDTO {
  @IsNotEmpty()
  status!: string;
  @IsNotEmpty()
  paymentMethod!: string;
}
