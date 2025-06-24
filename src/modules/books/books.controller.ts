import { Controller, Post, Get, Patch, Delete, Param, Body, Query, HttpCode } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BooksService } from './books.service';
import { FindBooksQueryDto } from './dto/find-books-query.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly svc: BooksService) {}

  @Post()
  create(@Body() dto: CreateBookDto) {
    return this.svc.create(dto);
  }

  @Get()
  findAll(@Query() query: FindBooksQueryDto) {
    return this.svc.findAll(
      +(query.page ?? '1'),
      +(query.limit ?? '10'),
      query.search,
      query.authorId
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.svc.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateBookDto) {
    return this.svc.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.svc.remove(id);
  }
}