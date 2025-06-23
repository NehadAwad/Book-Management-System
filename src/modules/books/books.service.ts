import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, QueryFailedError } from 'typeorm';
import { Book } from './book.entity';
import { Author } from '../authors/author.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';


@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private bookRepo: Repository<Book>,
    @InjectRepository(Author) private authorRepo: Repository<Author>,
  ) {}

  async create(dto: CreateBookDto): Promise<Book> {
    const author = await this.authorRepo.findOne({
      where: { id: dto.authorId },
    });
    if (!author) throw new BadRequestException('Author not found');

    const book = this.bookRepo.create(dto);
    book.author = author;
    book.authorId = dto.authorId;

    try {
      return await this.bookRepo.save(book);
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        (error as any).code === '23505'
      ) {
        throw new ConflictException('ISBN already exists');
      }
      throw error;
    }
  }

  async findAll(
    page = 1,
    limit = 10,
    search?: string,
    authorId?: string,
  ): Promise<Book[]> {
    const skip = (page - 1) * limit;
    const take = limit;
    let where: any;

    if (search && authorId) {
      where = [
        { title: Like(`%${search}%`), authorId },
        { isbn: Like(`%${search}%`), authorId },
      ];
    } else if (search) {
      where = [{ title: Like(`%${search}%`) }, { isbn: Like(`%${search}%`) }];
    } else if (authorId) {
      where = { authorId };
    } else {
      where = {};
    }

    return this.bookRepo.find({ where, skip, take });
  }

  async findOne(id: string): Promise<Book> {
    const book = await this.bookRepo.findOne({ where: { id } });
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  async update(id: string, dto: UpdateBookDto): Promise<Book> {
    const book = await this.findOne(id);
    if (dto.authorId) {
      const author = await this.authorRepo.findOne({
        where: { id: dto.authorId },
      });
      if (!author) throw new BadRequestException('Author not found');
      book.author = author;
      book.authorId = dto.authorId;
    }
    Object.assign(book, dto);

    try {
      return await this.bookRepo.save(book);
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        (error as any).code === '23505'
      ) {
        throw new ConflictException('ISBN already exists');
      }
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    const book = await this.findOne(id);
    await this.bookRepo.remove(book);
  }
}
