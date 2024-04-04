// login.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @ApiProperty({ description: 'The email address of the user' })
  email: string;

  @IsString()
  @ApiProperty({ description: 'The password of the user' })
  password: string;
}
