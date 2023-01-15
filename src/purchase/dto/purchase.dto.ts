import { baseDTO } from '@config/base.dto';
import { CustomerEntity } from '@customer/entities/customer.entity';
import { IsNotEmpty } from 'class-validator';

export class PurchaseDTO extends baseDTO {
  @IsNotEmpty()
  status!: string;
  @IsNotEmpty()
  paymentMethod!: string;

  @IsNotEmpty()
  customer!: CustomerEntity;
}
