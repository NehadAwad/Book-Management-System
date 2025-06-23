import { Controller, Post, Get, Patch, Delete, Param, Body, Query, HttpCode } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly svc: BooksService) {}

  @Post() create(@Body() dto: CreateBookDto) {
    return this.svc.create(dto);
  }

  @Get()
  findAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('search') search: string,
    @Query('authorId') authorId: string,
  ) {
    return this.svc.findAll(+page || 1, +limit || 10, search, authorId);
  }

  @Get(':id') findOne(@Param('id') id: string) {
    return this.svc.findOne(id);
  }

  @Patch(':id') update(@Param('id') id: string, @Body() dto: UpdateBookDto) {
    return this.svc.update(id, dto);
  }

  @Delete(':id') @HttpCode(204) remove(@Param('id') id: string) {
    return this.svc.remove(id);
  }
}