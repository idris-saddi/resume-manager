// age-criteria.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class AgeCriteriaDto {
  @ApiProperty({
    description: 'The age criteria to filter by.',
    required: false
  })
  @IsOptional()
  @IsNumber()
  age?: number;

  @ApiProperty({
    description: 'The criteria for (resume.firstname LIKE :criteria OR resume.lastname LIKE :criteria OR resume.job LIKE :criteria).',
    required: false
  })
  @IsOptional()
  @IsString()
  criteria?: string;
}
