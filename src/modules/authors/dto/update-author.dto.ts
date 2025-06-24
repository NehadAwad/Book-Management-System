import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthorDto } from './create-author.dto';
import { Transform } from 'class-transformer';
import * as sanitizeHtml from 'sanitize-html';
import { IsString, IsOptional } from 'class-validator';

export class UpdateAuthorDto extends PartialType(CreateAuthorDto) {
    @IsOptional()
    @IsString()
    @Transform(({ value }) => (typeof value === 'string' ? sanitizeHtml(value) : value))
    bio?: string;
}