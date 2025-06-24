import { IsString, IsOptional, IsDateString, IsUUID, IsISBN } from 'class-validator';
import { Transform } from 'class-transformer';
import * as sanitizeHtml from 'sanitize-html';

export class CreateBookDto {
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? sanitizeHtml(value) : value))
  title: string;

  @IsISBN()
  isbn: string;

  @IsOptional()
  @IsDateString()
  publishedDate?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? sanitizeHtml(value) : value))
  genre?: string;

  @IsUUID()
  authorId: string;
}