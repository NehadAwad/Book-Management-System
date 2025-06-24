import { IsString, IsOptional, IsDateString, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';
import * as sanitizeHtml from 'sanitize-html';

export class CreateAuthorDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => (typeof value === 'string' ? sanitizeHtml(value) : value))
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => (typeof value === 'string' ? sanitizeHtml(value) : value))
  lastName: string;

  @IsOptional() @IsString() bio?: string;
  @IsOptional() @IsDateString() birthDate?: string;
}