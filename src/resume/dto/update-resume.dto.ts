// update-resume.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateResumeDto {
  @ApiProperty({ description: 'The first name of the user', required: false })
  @IsString()
  @IsOptional()
  readonly firstname?: string;

  @ApiProperty({ description: 'The last name of the user', required: false })
  @IsString()
  @IsOptional()
  readonly lastname?: string;

  @ApiProperty({ description: 'The age of the user', required: false })
  @IsNumber()
  @IsOptional()
  readonly age?: number;

  @ApiProperty({ description: 'The CIN (national identification number) of the user', required: false })
  @IsNumber()
  @IsOptional()
  readonly cin?: number;

  @ApiProperty({ description: 'The job of the user', required: false })
  @IsString()
  @IsOptional()
  readonly job?: string;
}
