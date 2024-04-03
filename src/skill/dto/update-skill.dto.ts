// update-skill.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateSkillDto {
  @ApiProperty({ description: 'The label of the skill (optional)' })
  @IsString()
  @IsOptional()
  readonly label?: string;
}