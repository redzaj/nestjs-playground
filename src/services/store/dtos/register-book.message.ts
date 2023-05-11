import { Book } from '../models/book.model';

export class RegisterBookMessage implements Omit<Book, 'id'> {
  title: string;
}
