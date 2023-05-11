import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';
import { CourierModule } from './courier.module';

async function bootstrap() {
  // const app = await NestFactory.createMicroservice(CourierModule.forService(), {
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: ['amqp://root:password@rabbitmq:5672'],
  //     queue: 'courier',
  //   },
  //   bufferLogs: true,
  // });

  const app = await NestFactory.createMicroservice(CourierModule.forService(), {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://root:password@rabbitmq:5672'],
      queue: 'courier',
    },
    bufferLogs: true,
  });

  app.useLogger(app.get(Logger));

  await app.listen();
}
bootstrap();
