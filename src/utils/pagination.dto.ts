// pagination.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class PaginationDto {
  @ApiProperty({ description: 'Page number', default: 1 })
  @IsInt()
  @Min(1)
  page: number = 1;

  @ApiProperty({ description: 'Items per page', default: 10 })
  @IsInt()
  @Min(1)
  perPage: number = 10;
}
