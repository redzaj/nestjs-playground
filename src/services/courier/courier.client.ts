import { Observable } from 'rxjs';
import { SendEmailEvent } from './dtos/send-email.event';
import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export abstract class CourierClient implements Pick<ClientProxy, 'emit'> {
  abstract emit<TResult = any, TInput = SendEmailEvent>(
    pattern: 'v1.sendNotification',
    data: TInput,
  ): Observable<TResult>;
}
