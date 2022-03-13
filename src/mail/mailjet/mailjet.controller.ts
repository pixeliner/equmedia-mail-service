import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { SuccessResponseModel } from '../models/success-response.model';
import { SendEmailDto } from './dto/send-email.dto';
import { MailjetService } from './mailjet.service';

@Controller('mailjet')
export class MailjetController {
  constructor(private readonly mailjetService: MailjetService) {}

  @MessagePattern({ role: 'mail', cmd: 'send', type: 'confirmation' })
  async sendConfirmCreateAccountEmail(
    sendEmailDto: SendEmailDto,
  ): Promise<SuccessResponseModel> {
    return await this.mailjetService.sendConfirmCreateAccountEmail(
      sendEmailDto,
    );
  }

  @MessagePattern({ role: 'mail', cmd: 'send', type: 'reset-password' })
  async sendForgotPasswordEmail(
    sendEmailDto: SendEmailDto,
  ): Promise<SuccessResponseModel> {
    return await this.mailjetService.sendForgotPasswordEmail(sendEmailDto);
  }

  @MessagePattern({ role: 'mail', cmd: 'send', type: 'set-new-password' })
  async sendSetNewPasswordEmail(
    sendEmailDto: SendEmailDto,
  ): Promise<SuccessResponseModel> {
    return await this.mailjetService.sendSetNewPasswordEmail(sendEmailDto);
  }

  @MessagePattern({ role: 'mail', cmd: 'send', type: 'confirm-subscription' })
  async sendConfirmSubscriptionEmail(
    sendEmailDto: SendEmailDto,
  ): Promise<SuccessResponseModel> {
    return await this.mailjetService.sendConfirmSubscriptionEmail(sendEmailDto);
  }

  @MessagePattern({ role: 'mail', cmd: 'send', type: 'delete-account' })
  async sendDeleteAccountMail(
    sendEmailDto: SendEmailDto,
  ): Promise<SuccessResponseModel> {
    return await this.mailjetService.sendDeleteAccountMail(sendEmailDto);
  }
}
