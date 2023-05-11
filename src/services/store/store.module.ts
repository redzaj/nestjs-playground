import { DynamicModule, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { LoggerModule } from 'nestjs-pino';
import { BooksService } from './books.service';
import { StoreClient } from './store.client';

@Module({
  providers: [BooksService],
})
export class StoreModule {
  static forClient(): DynamicModule {
    return {
      module: StoreModule,
      imports: [
        ClientsModule.register([
          {
            name: 'StoreProxyClient',
            transport: Transport.RMQ,
            options: {
              urls: ['amqp://root:password@rabbitmq:5672'],
              queue: 'store',
            },
          },
        ]),
      ],
      providers: [{ provide: StoreClient, useExisting: 'StoreProxyClient' }],
      exports: [StoreClient],
    };
  }

  static forService(): DynamicModule {
    return {
      module: StoreModule,
      imports: [LoggerModule.forRoot()],
      controllers: [BooksService],
    };
  }
}
