import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { SendEmailEvent } from './dtos/send-email.event';

@Controller()
export class CourierService {
  @EventPattern('v1.sendNotification')
  async notify(event: SendEmailEvent): Promise<void> {
    console.log(event);
  }
}
