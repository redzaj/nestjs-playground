import { Observable } from 'rxjs';
import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { GetBooksMessage } from './dtos/get-books.message';
import { Book } from './models/book.model';
import { GetBookMessage } from './dtos/get-book.message';
import { RegisterBookMessage } from './dtos/register-book.message';

@Injectable()
export abstract class StoreClient implements Pick<ClientProxy, 'send'> {
  abstract send<TResult = Book[], TInput = GetBooksMessage>(
    pattern: 'v1.getBooks',
    data: TInput,
  ): Observable<TResult>;
  abstract send<TResult = Book, TInput = GetBookMessage>(
    pattern: 'v1.getBook',
    data: TInput,
  ): Observable<TResult>;
  abstract send<TResult = Book, TInput = RegisterBookMessage>(
    pattern: 'v1.registerBook',
    data: TInput,
  ): Observable<TResult>;
}
