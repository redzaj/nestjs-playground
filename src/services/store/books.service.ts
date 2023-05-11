import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { GetBooksMessage } from './dtos/get-books.message';
import { Book } from './models/book.model';
import { GetBookMessage } from './dtos/get-book.message';
import { RegisterBookMessage } from './dtos/register-book.message';

@Controller()
export class BooksService {
  private store: Book[] = [
    { id: 1, title: 'To Kill a Mockingbird' },
    { id: 2, title: 'The Hobbit' },
  ];

  @MessagePattern('v1.getBooks')
  async getBooks({ limit }: GetBooksMessage): Promise<Book[]> {
    return this.store.slice(0, limit);
  }

  @MessagePattern('v1.getBook')
  async getBook({ id }: GetBookMessage): Promise<Book> {
    return this.store.find((book) => book.id === id);
  }

  @MessagePattern('v1.registerBook')
  async registerBook(message: RegisterBookMessage): Promise<Book> {
    const result: Book = {
      id: this.store.length + 1,
      ...message,
    };

    this.store.push(result);

    return result;
  }
}
