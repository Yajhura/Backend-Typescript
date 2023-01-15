import { baseDTO } from '@config/base.dto';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

import { ProductoEntity } from '../../product/entities/product.entity';
import { PurchaseEntity } from '../entities/purchase.entity';

export class PurchaseProductDTO extends baseDTO {
  @IsNotEmpty()
  quantityProduct!: number;

  @IsOptional()
  totalPrice?: number;

  @IsOptional()
  purchase?: PurchaseEntity;

  @IsOptional()
  product?: ProductoEntity;
}
