// create-skill.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateSkillDto {
  @ApiProperty({ description: 'The label of the skill' })
  @IsString()
  readonly label: string;
}