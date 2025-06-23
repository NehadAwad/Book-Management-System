import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Author } from '../authors/author.entity';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column() title: string;
  @Column({ unique: true }) isbn: string;
  @Column('date', { nullable: true }) publishedDate: string;
  @Column({ nullable: true }) genre: string;

  @ManyToOne(() => Author, (author) => author.books, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'authorId' }) author: Author;
  @Column() authorId: string;

  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;
}
