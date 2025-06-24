import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumberString, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class PaginationQueryDto {
  @ApiPropertyOptional({
    description: 'Page number (starts from 1)',
    default: 1,
  })
  @IsOptional()
  @IsNumberString()
  @Transform(({ value }) => value || '1')
  page?: string;

  @ApiPropertyOptional({
    description: 'Number of items per page',
    default: 10,
  })
  @IsOptional()
  @IsNumberString()
  @Transform(({ value }) => value || '10')
  limit?: string;

  @ApiPropertyOptional({
    description: 'Search term to filter results',
  })
  @IsOptional()
  @IsString()
  search?: string;
} 