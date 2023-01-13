import { baseDTO } from '@config/base.dto';
import { IsNotEmpty } from 'class-validator';

export class CustomerDTO extends baseDTO {
  @IsNotEmpty()
  address!: string;

  @IsNotEmpty()
  dni!: number;
}
