import { baseDTO } from '@config/base.dto';
import { IsNotEmpty } from 'class-validator';

export class CategoryDTO extends baseDTO {
  @IsNotEmpty()
  category_name!: string;
}
