import { baseDTO } from '@config/base.dto';
import { UserEntity } from '@user/entities/user.entity';
import { IsNotEmpty } from 'class-validator';



export class CustomerDTO extends baseDTO {
  @IsNotEmpty()
  address!: string;

  @IsNotEmpty()
  dni!: number;

  @IsNotEmpty()
  user!: UserEntity;
}
