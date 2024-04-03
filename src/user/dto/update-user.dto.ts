// update-user.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ description: 'The username of the user (optional)' })
  @IsString()
  @IsOptional()
  readonly username?: string;

  @ApiProperty({ description: 'The email address of the user (optional)' })
  @IsString()
  @IsOptional()
  readonly email?: string;

  @ApiProperty({ description: 'The password of the user (optional)' })
  @IsString()
  @IsOptional()
  readonly password?: string;
}