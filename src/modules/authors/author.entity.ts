import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { Book } from '../books/book.entity';

@Entity('authors')
export class Author {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Index()
  @Column() firstName: string;
  @Index()
  @Column() lastName: string;
  @Column({ type: 'text', nullable: true }) bio: string;
  @Column({ type: 'date', nullable: true }) birthDate: string;
  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;
  @OneToMany(() => Book, (book) => book.author, {
    cascade: ['insert', 'update'],
  })
  books: Book[];
}
