// create-resume.dto.ts

import { IsString, IsNumber } from 'class-validator';

export class CreateResumeDto {
  @IsString()
  readonly firstname: string;

  @IsString()
  readonly lastname: string;

  @IsNumber()
  readonly age: number;

  @IsNumber()
  readonly cin: number;

  @IsString()
  readonly job: string;

  @IsString()
  readonly path: string;
}
