import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Author } from './author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorsService {
  constructor(@InjectRepository(Author) private repo: Repository<Author>) {}

  create(dto: CreateAuthorDto) {
    const author = this.repo.create(dto);
    return this.repo.save(author);
  }

  findAll(page = 1, limit = 10, search?: string) {
    const where = search
      ? [{ firstName: Like(`%${search}%`) }, { lastName: Like(`%${search}%`) }]
      : {};
    return this.repo.find({ where, skip: (page - 1) * limit, take: limit });
  }

  async findOne(id: string) {
    const author = await this.repo.findOne({ where: { id } });
    if (!author) throw new NotFoundException('Author not found');
    return author;
  }

  async update(id: string, dto: UpdateAuthorDto) {
    const author = await this.findOne(id);
    Object.assign(author, dto);
    return this.repo.save(author);
  }

  async remove(id: string) {
    const author = await this.findOne(id);
    return this.repo.remove(author);
  }
}
