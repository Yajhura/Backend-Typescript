import { baseDTO } from '@config/base.dto';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CategoryDTO extends baseDTO {
  @IsNotEmpty()
  categoryName!: string;

  @IsOptional()
  colorBadge?: string;
}
