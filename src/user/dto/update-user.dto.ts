// update-user.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEmail } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ required: false, description: 'The username of the user (optional)' })
  @IsString()
  @IsOptional()
  readonly username?: string;

  @ApiProperty({ required: false, description: 'The email address of the user (optional)' })
  @IsString()
  @IsEmail()
  @IsOptional()
  readonly email?: string;

  @ApiProperty({ required: false, description: 'The password of the user (optional)' })
  @IsString()
  @IsOptional()
  readonly password?: string;
}