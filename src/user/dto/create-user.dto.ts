// create-user.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'The username of the user' })
  @IsString()
  readonly username: string;

  @ApiProperty({ description: 'The email address of the user' })
  @IsEmail()
  @IsString()
  readonly email: string;

  @ApiProperty({ description: 'The password of the user' })
  @IsString()
  readonly password: string;
}