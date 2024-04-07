// create-resume.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateResumeDto {
  @ApiProperty({ description: 'The first name of the person' })
  @IsString()
  readonly firstname: string;

  @ApiProperty({ description: 'The last name of the person' })
  @IsString()
  readonly lastname: string;

  @ApiProperty({ description: 'The age of the person' })
  @IsNumber()
  readonly age: number;

  @ApiProperty({ description: 'The CIN (National Identity Card) of the person' })
  @IsNumber()
  readonly cin: number;

  @ApiProperty({ description: 'The job title of the person' })
  @IsString()
  readonly job: string;
}
