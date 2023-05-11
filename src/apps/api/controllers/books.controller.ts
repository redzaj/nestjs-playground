import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { CourierClient } from '@service/courier/courier.client';
import { StoreClient } from '@service/store/store.client';
import { Book } from '@service/store/models/book.model';
import { GetBooksMessage } from '@service/store/dtos/get-books.message';
import { GetBookMessage } from '@service/store/dtos/get-book.message';
import { RegisterBookMessage } from '@service/store/dtos/register-book.message';

@Controller('books')
export class BooksController {
  constructor(private courier: CourierClient, private store: StoreClient) {}

  @Get()
  async index(@Query() message: GetBooksMessage): Promise<Book[]> {
    return lastValueFrom(this.store.send('v1.getBooks', message));
  }

  @Get(':id')
  async details(@Param('id') id: GetBookMessage): Promise<Book> {
    return lastValueFrom(this.store.send('v1.getBook', { id }));
  }

  @Post()
  async register(@Body() book: RegisterBookMessage): Promise<Book> {
    const created = await lastValueFrom(
      this.store.send('v1.registerBook', book),
    );

    this.courier.emit('v1.sendNotification', {
      from: '',
      to: '',
      html: '',
      text: '',
      subject: `New title arrived: ${created.title}`,
    });

    return created;
  }
}
