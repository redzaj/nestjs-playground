import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';
import { StoreModule } from './store.module';

async function bootstrap() {
  // const app = await NestFactory.createMicroservice(StoreModule.forService(), {
  //   transport: Transport.TCP,
  //   options: { host: '0.0.0.0', port: 9001 },
  //   bufferLogs: true,
  // });

  // const app = await NestFactory.createMicroservice(StoreModule.forService(), {
  //   transport: Transport.REDIS,
  //   options: {
  //     host: 'redis',
  //     port: 6379,
  //   },
  //   bufferLogs: true,
  // });

  const app = await NestFactory.createMicroservice(StoreModule.forService(), {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://root:password@rabbitmq:5672'],
      queue: 'store',
    },
    bufferLogs: true,
  });

  app.useLogger(app.get(Logger));

  await app.listen();
}
bootstrap();
