import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';

export class FindBooksQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({
    description: 'Filter books by author ID',
  })
  @IsOptional()
  @IsUUID()
  authorId?: string;
} 