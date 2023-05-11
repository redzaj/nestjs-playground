import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { StoreModule } from '@service/store/store.module';
import { CourierModule } from '@service/courier/courier.module';

import { BooksController } from './controllers/books.controller';

@Module({
  imports: [
    LoggerModule.forRoot(),
    CourierModule.forClient(),
    StoreModule.forClient(),
  ],
  controllers: [BooksController],
})
export class AppModule {}
