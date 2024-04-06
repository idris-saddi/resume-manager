// update-skill.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateSkillDto {
  @ApiProperty({required: false, description: 'The label of the skill (optional)' })
  @IsString()
  readonly label?: string;
}