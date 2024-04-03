// age-criteria.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class AgeCriteriaDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  age?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  criteria?: string;
}
