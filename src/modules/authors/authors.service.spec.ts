import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AuthorsService } from './authors.service';
import { Author } from './author.entity';

describe('AuthorsService (unit)', () => {
  let service: AuthorsService;
  let repo: Repository<Author>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorsService,
        {
          provide: getRepositoryToken(Author),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get(AuthorsService);
    repo = module.get(getRepositoryToken(Author));
  });

  it('create() should persist and return an author', async () => {
    const dto = { firstName: 'Jane', lastName: 'Doe' };
    const author = { id: '1', ...dto } as Author;

    jest.spyOn(repo, 'create').mockReturnValue(author);
    jest.spyOn(repo, 'save').mockResolvedValue(author);

    expect(await service.create(dto)).toEqual(author);
  });

  it('findAll() should return list of authors', async () => {
    const authors = [{ id: 'a' }, { id: 'b' }] as Author[];
    jest.spyOn(repo, 'find').mockResolvedValue(authors);

    expect(await service.findAll()).toBe(authors);
  });

  it('findOne() should return an author when found', async () => {
    const author = { id: '42' } as Author;
    jest.spyOn(repo, 'findOne').mockResolvedValue(author);

    expect(await service.findOne('42')).toBe(author);
  });

  it('findOne() should throw NotFoundException when not found', async () => {
    jest.spyOn(repo, 'findOne').mockResolvedValue(null);
    await expect(service.findOne('nope')).rejects.toThrow(NotFoundException);
  });

  it('update() should merge and save the updated author', async () => {
    const existing = { id: 'x', firstName: 'Old' } as Author;
    const changes = { firstName: 'New' };
    const updated = { ...existing, ...changes } as Author;

    jest.spyOn(repo, 'findOne').mockResolvedValue(existing);
    jest.spyOn(repo, 'merge').mockReturnValue(updated);
    jest.spyOn(repo, 'save').mockResolvedValue(updated);

    expect(await service.update('x', changes)).toEqual(updated);
  });

  it('remove() should delete an existing author', async () => {
    const existing = { id: 'y' } as Author;
    jest.spyOn(repo, 'findOne').mockResolvedValue(existing);
    jest.spyOn(repo, 'remove').mockResolvedValue(existing);

    expect(await service.remove('y')).toEqual(existing);
  });

  it('remove() should throw NotFoundException when not found', async () => {
    jest.spyOn(repo, 'findOne').mockResolvedValue(null);
    await expect(service.remove('zzz')).rejects.toThrow(NotFoundException);
  });
});
