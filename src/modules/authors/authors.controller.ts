import { Controller, Post, Get, Patch, Delete, Param, Body, Query, HttpCode, UseInterceptors } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { FindAuthorsQueryDto } from './dto/find-authors-query.dto';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Authors')
@Controller('authors')
export class AuthorsController {
  constructor(private readonly svc: AuthorsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new author' })
  create(@Body() dto: CreateAuthorDto) {
    return this.svc.create(dto);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheKey('all_authors')
  @CacheTTL(120) // 2 minutes
  @ApiOperation({ summary: 'Get all authors with pagination and filtering' })
  findAll(@Query() query: FindAuthorsQueryDto) {
    return this.svc.findAll(
      +(query.page ?? '1'),
      +(query.limit ?? '10'),
      query.search
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an author by ID' })
  findOne(@Param('id') id: string) {
    return this.svc.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an author' })
  update(@Param('id') id: string, @Body() dto: UpdateAuthorDto) {
    return this.svc.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete an author' })
  remove(@Param('id') id: string) {
    return this.svc.remove(id);
  }
}