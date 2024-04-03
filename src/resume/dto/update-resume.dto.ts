// update-resume.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateResumeDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly firstname?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly lastname?: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly age?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly cin?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly job?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly path?: string;
}
