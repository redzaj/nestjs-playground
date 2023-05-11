import { DynamicModule, Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CourierService } from './courier.service';
import { CourierClient } from './courier.client';

@Module({})
export class CourierModule {
  static forClient(): DynamicModule {
    return {
      module: CourierModule,
      imports: [
        ClientsModule.register([
          {
            name: 'CourierProxyClient',
            transport: Transport.RMQ,
            options: {
              urls: ['amqp://root:password@rabbitmq:5672'],
              queue: 'courier',
            },
          },
          // {
          //   name: 'CourierProxyClient',
          //   transport: Transport.KAFKA,
          //   options: {
          //     client: {
          //       clientId: 'courier',
          //       brokers: ['kafka:9092'],
          //     },
          //     consumer: {
          //       groupId: 'courier-consumer',
          //     },
          //   },
          // }
        ]),
      ],
      providers: [
        { provide: CourierClient, useExisting: 'CourierProxyClient' },
      ],
      exports: [CourierClient],
    };
  }

  static forService(): DynamicModule {
    return {
      module: CourierModule,
      imports: [LoggerModule.forRoot()],
      controllers: [CourierService],
      providers: [CourierService],
    };
  }
}
