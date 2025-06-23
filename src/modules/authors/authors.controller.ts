import { Controller, Post, Get, Patch, Delete, Param, Body, Query, HttpCode } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly svc: AuthorsService) {}

  @Post() create(@Body() dto: CreateAuthorDto) {
    return this.svc.create(dto);
  }

  @Get()
  findAll(@Query('page') page: string, @Query('limit') limit: string, @Query('search') search: string) {
    return this.svc.findAll(+page || 1, +limit || 10, search);
  }

  @Get(':id') findOne(@Param('id') id: string) {
    return this.svc.findOne(id);
  }

  @Patch(':id') update(@Param('id') id: string, @Body() dto: UpdateAuthorDto) {
    return this.svc.update(id, dto);
  }

  @Delete(':id') @HttpCode(204) remove(@Param('id') id: string) {
    return this.svc.remove(id);
  }
}