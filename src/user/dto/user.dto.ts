import { baseDTO } from '@config/base.dto';
import { IsNotEmpty } from 'class-validator';


export class UserDTO extends baseDTO {
  @IsNotEmpty()
  username!: string;

  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  lastname!: string;

  @IsNotEmpty()
  email!: string;

  @IsNotEmpty()
  password!: string;

  @IsNotEmpty()
  city!: string;

  @IsNotEmpty()
  province!: string;

}
