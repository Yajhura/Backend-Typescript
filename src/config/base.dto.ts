import { IsDate,IsOptional, IsUUID } from 'class-validator';

export class baseDTO {
  @IsUUID()
  @IsOptional()
  id!: string;

  @IsDate()
  @IsOptional()
  createdAt!: Date;

  @IsDate()
  @IsOptional()
  updateAt!: Date;
}
